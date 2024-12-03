import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { FilterCareerDto, PaginationDto } from '@core/dto';
import { RubricEntity } from '@uic/entities';
import {
  CreateRubricDto,
  FilterRubricDto,
  ReadRubricDto,
  UpdateRubricDto,
} from '@uic/dto';

@Injectable()
export class RubricsService {
  constructor(
    @Inject(RepositoryEnum.RUBRIC_REPOSITORY)
    private rubricRepository: Repository<RubricEntity>,
  ) {}

  async create(payload: CreateRubricDto): Promise<ServiceResponseHttpModel> {
    const newRubric = this.rubricRepository.create(payload);
    const rubricCreated = await this.rubricRepository.save(newRubric);

    return { data: plainToInstance(ReadRubricDto, rubricCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.rubricRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterRubricDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.rubricRepository.findAndCount({
      relations: {
        item: true,
        career: true,
        nameStudent: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadRubricDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const rubric = await this.rubricRepository.findOne({
      where: { id },
      relations: {
        item: true,
        career: true,
        nameStudent: true,
      },
    });

    if (!rubric) {
      throw new NotFoundException('Rubric not found');
    }
    return { data: plainToInstance(ReadRubricDto, rubric) };
  }

  async findByCareer(
    careerId: string,
    params?: FilterRubricDto,
  ): Promise<ServiceResponseHttpModel> {
    const response = await this.rubricRepository.findAndCount({
      where: [{ career: { id: careerId } }],
      relations: {
        item: true,
        career: true,
        nameStudent: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadRubricDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async update(
    id: string,
    payload: UpdateRubricDto,
  ): Promise<ServiceResponseHttpModel> {
    const rubric = await this.rubricRepository.preload({ id, ...payload });

    if (!rubric) {
      throw new NotFoundException('Rubric not found');
    }
    const rubricUpdated = await this.rubricRepository.save(rubric);

    return { data: plainToInstance(ReadRubricDto, rubricUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const rubric = await this.rubricRepository.findOneBy({ id });

    if (!rubric) {
      throw new NotFoundException('Rubric not found');
    }
    const rubricDeleted = await this.rubricRepository.softRemove(rubric);

    return { data: plainToInstance(ReadRubricDto, rubricDeleted) };
  }

  async removeAll(payload: RubricEntity[]): Promise<ServiceResponseHttpModel> {
    const rubricsDeleted = await this.rubricRepository.softRemove(payload);
    return { data: rubricsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRubricDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RubricEntity>
      | FindOptionsWhere<RubricEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.rubricRepository.findAndCount({
      where,
      relations: {
        item: true,
        career: true,
        nameStudent: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadRubricDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
