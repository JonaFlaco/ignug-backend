import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateEvaluationDto,
  ReadEvaluationDto,
  FilterEvaluationDto,
  UpdateEvaluationDto,
} from '@uic/dto';
import { EvaluationEntity } from '@uic/entities';
import { Repository, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class EvaluationService {
  constructor(
    @Inject(RepositoryEnum.EVALUATION_REPOSITORY)
    private repository: Repository<EvaluationEntity>,
  ) {}

  async create(
    payload: CreateEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    const newEvaluation = this.repository.create(payload);
    const uploadEvaluationCreated = await this.repository.save(newEvaluation);

    return {
      data: plainToInstance(ReadEvaluationDto, uploadEvaluationCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getEvaluationSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        student: true,
        //name: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadEvaluationDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findOne(id: string): Promise<ServiceResponseHttpModel> {
  //   const requirementRequest = await this.repository.findOneBy({ id });
  //   if (!requirementRequest) {
  //     throw new NotFoundException('RequirementRequest not found');
  //   }
  //   return { data: plainToInstance(ReadRequirementRequestDto, requirementRequest) };
  // }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.findOne({
      where: { id },
      relations: {
        student: true,
      },
    });

    if (!evaluation) {
      throw new NotFoundException('Upload not found');
    }
    return {
      data: plainToInstance(ReadEvaluationDto, evaluation),
    };
  }

  async update(
    id: string,
    payload: UpdateEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.preload({
      id,
      ...payload,
    });

    if (!evaluation) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const evaluationUpdated = await this.repository.save(evaluation);

    return {
      data: plainToInstance(ReadEvaluationDto, evaluationUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const evaluationDelete = await this.repository.softRemove(evaluation);

    return {
      data: plainToInstance(ReadEvaluationDto, evaluationDelete),
    };
  }

  async removeAll(
    payload: EvaluationEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const evaluationDeleted = await this.repository.softRemove(payload);
    return { data: evaluationDeleted };
  }

  private async paginateAndFilter(
    params: FilterEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<EvaluationEntity>
      | FindOptionsWhere<EvaluationEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        student: true,
        //name: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadEvaluationDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
