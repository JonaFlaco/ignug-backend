import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateReviewRequirementDto,
  ReadReviewRequirementDto,
  FilterReviewRequirementDto,
  UpdateReviewRequirementDto,
} from '@uic/dto';
import { ReviewRequirementEntity } from '@uic/entities';
import { Repository, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { StatusEnum } from '../enums';

@Injectable()
export class ReviewRequirementsService {
  constructor(
    @Inject(RepositoryEnum.REVIEW_REQUIREMENT_REPOSITORY)
    private repository: Repository<ReviewRequirementEntity>,
  ) {}

  async create(
    payload: CreateReviewRequirementDto,
  ): Promise<ServiceResponseHttpModel> {
    const newReviewRequirement = this.repository.create(payload);
    newReviewRequirement.status = StatusEnum.WAITING;
    const reviewRequirementCreated = await this.repository.save(
      newReviewRequirement,
    );

    return {
      data: plainToInstance(ReadReviewRequirementDto, reviewRequirementCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getReviewRequirementsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterReviewRequirementDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        planning: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadReviewRequirementDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const reviewRequirement = await this.repository.findOne({
      where: { id },
      relations: {
        planning: true,
      },
    });

    if (!reviewRequirement) {
      throw new NotFoundException('Upload not found');
    }
    return {
      data: plainToInstance(ReadReviewRequirementDto, reviewRequirement),
    };
  }

  async update(
    id: string,
    payload: UpdateReviewRequirementDto,
  ): Promise<ServiceResponseHttpModel> {
    const reviewRequirement = await this.repository.preload({
      id,
      ...payload,
    });

    if (!reviewRequirement) {
      throw new NotFoundException('Requirement not found');
    }
    if (reviewRequirement.status == null) {
      reviewRequirement.status = StatusEnum.WAITING;
    }
    const reviewRequirementUpdated = await this.repository.save(
      reviewRequirement,
    );

    return {
      data: plainToInstance(ReadReviewRequirementDto, reviewRequirementUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const reviewRequirement = await this.repository.findOneBy({ id });

    if (!reviewRequirement) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const reviewRequirementDelete = await this.repository.softRemove(
      reviewRequirement,
    );

    return {
      data: plainToInstance(ReadReviewRequirementDto, reviewRequirementDelete),
    };
  }

  async removeAll(
    payload: ReviewRequirementEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const reviewRequirementsDeleted = await this.repository.softRemove(payload);
    return { data: reviewRequirementsDeleted };
  }

  private async paginateAndFilter(
    params: FilterReviewRequirementDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ReviewRequirementEntity>
      | FindOptionsWhere<ReviewRequirementEntity>[];
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
        planning: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadReviewRequirementDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
