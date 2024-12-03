import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { EvaluationDateEntity } from '@uic/entities';
import {
  CreateEvaluationDateDto,
  FilterEvaluationDateDto,
  ReadEvaluationDateDto,
  UpdateEvaluationDateDto,
} from '@uic/dto';

@Injectable()
export class EvaluationDateService {
  constructor(
    @Inject(RepositoryEnum.EVALUATION_DATE_REPOSITORY)
    private evaluationDateRepository: Repository<EvaluationDateEntity>,
  ) {}

  async create(payload: CreateEvaluationDateDto): Promise<ServiceResponseHttpModel> {
    const newEvaluationDate = this.evaluationDateRepository.create(payload);
    const evaluationDateCreated = await this.evaluationDateRepository.save(newEvaluationDate);

    return { data: plainToInstance(ReadEvaluationDateDto, evaluationDateCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.evaluationDateRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterEvaluationDateDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.evaluationDateRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadEvaluationDateDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const evaluationDate = await this.evaluationDateRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!evaluationDate) {
      throw new NotFoundException('EvaluationDatenot found');
    }
    return { data: plainToInstance(ReadEvaluationDateDto, evaluationDate) };
  }

  async update(
    id: string,
    payload: UpdateEvaluationDateDto,
  ): Promise<ServiceResponseHttpModel> {
    const evaluationDate = await this.evaluationDateRepository.preload({ id, ...payload });

    if (!evaluationDate) {
      throw new NotFoundException('EvaluationDate not found');
    }
    const evaluationDateUpdated = await this.evaluationDateRepository.save(evaluationDate);

    return { data: plainToInstance(ReadEvaluationDateDto, evaluationDateUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const evaluationDate = await this.evaluationDateRepository.findOneBy({ id });

    if (!evaluationDate) {
      throw new NotFoundException('EvaluationDate not found');
    }
    const evaluationDateDeleted = await this.evaluationDateRepository.softRemove(evaluationDate);

    return { data: plainToInstance(ReadEvaluationDateDto, evaluationDateDeleted) };
  }

  async removeAll(payload: EvaluationDateEntity[]): Promise<ServiceResponseHttpModel> {
    const evaluationDateDeleted = await this.evaluationDateRepository.softRemove(payload);
    return { data: evaluationDateDeleted };
  }

  private async paginateAndFilter(
    params: FilterEvaluationDateDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<EvaluationDateEntity>
      | FindOptionsWhere<EvaluationDateEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ dni: ILike(`%${search}%`) });
    }

    const response = await this.evaluationDateRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadEvaluationDateDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
