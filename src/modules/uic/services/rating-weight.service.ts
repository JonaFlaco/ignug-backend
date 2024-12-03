import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { RatingWeightEntity } from '@uic/entities';
import {
  CreateRatingWeightDto,
  FilterRatingWeightDto,
  ReadRatingWeightDto,
  UpdateRatingWeightDto,
} from '@uic/dto';

@Injectable()
export class RatingWeightsService {
  constructor(
    @Inject(RepositoryEnum.RATING_WEIGHT_REPOSITORY)
    private ratingWeightRepository: Repository<RatingWeightEntity>,
  ) {}

  async create(
    payload: CreateRatingWeightDto,
  ): Promise<ServiceResponseHttpModel> {
    const newRatingWeight = this.ratingWeightRepository.create(payload);
    const ratingWeightCreated = await this.ratingWeightRepository.save(
      newRatingWeight,
    );

    return { data: plainToInstance(ReadRatingWeightDto, ratingWeightCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.ratingWeightRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterRatingWeightDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.ratingWeightRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadRatingWeightDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const ratingWeight = await this.ratingWeightRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!ratingWeight) {
      throw new NotFoundException('Rating Weight not found');
    }
    return { data: plainToInstance(ReadRatingWeightDto, ratingWeight) };
  }

  async update(
    id: string,
    payload: UpdateRatingWeightDto,
  ): Promise<ServiceResponseHttpModel> {
    const ratingWeight = await this.ratingWeightRepository.preload({
      id,
      ...payload,
    });

    if (!ratingWeight) {
      throw new NotFoundException('Rating Weight not found');
    }
    const ratingWeightUpdated = await this.ratingWeightRepository.save(
      ratingWeight,
    );

    return { data: plainToInstance(ReadRatingWeightDto, ratingWeightUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const ratingWeight = await this.ratingWeightRepository.findOneBy({ id });

    if (!ratingWeight) {
      throw new NotFoundException('Rating Weight not found');
    }
    const ratingWeightDeleted = await this.ratingWeightRepository.softRemove(
      ratingWeight,
    );

    return { data: plainToInstance(ReadRatingWeightDto, ratingWeightDeleted) };
  }

  async removeAll(
    payload: RatingWeightEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const ratingWeightsDeleted = await this.ratingWeightRepository.softRemove(
      payload,
    );
    return { data: ratingWeightsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRatingWeightDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RatingWeightEntity>
      | FindOptionsWhere<RatingWeightEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ title: ILike(`%${search}%`) });
    }

    const response = await this.ratingWeightRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadRatingWeightDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
