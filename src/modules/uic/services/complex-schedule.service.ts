import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { ComplexScheduleEntity } from '@uic/entities';
import {
  CreateComplexScheduleDto,
  FilterComplexScheduleDto,
  ReadComplexScheduleDto,
  UpdateComplexScheduleDto,
} from '@uic/dto';

@Injectable()
export class ComplexSchedulesService {
  constructor(
    @Inject(RepositoryEnum.COMPLEX_SCHEDULE)
    private complexScheduleRepository: Repository<ComplexScheduleEntity>,
  ) {}

  async create(
    payload: CreateComplexScheduleDto,
  ): Promise<ServiceResponseHttpModel> {
    const newComplexTimeline = this.complexScheduleRepository.create(payload);
    const complexTimelineCreated = await this.complexScheduleRepository.save(
      newComplexTimeline,
    );

    return {
      data: plainToInstance(ReadComplexScheduleDto, complexTimelineCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.complexScheduleRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterComplexScheduleDto,
  ): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.sort) {
      return this.filterBySort(params.sort);
    }

    //All
    const response = await this.complexScheduleRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadComplexScheduleDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  private async filterBySort(sort: number): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<ComplexScheduleEntity> = {};

    if (sort) {
      where.sort = LessThan(sort);
    }

    const response = await this.complexScheduleRepository.findAndCount({
      relations: [],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.complexScheduleRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadComplexScheduleDto, format) };
  }

  async update(
    id: string,
    payload: UpdateComplexScheduleDto,
  ): Promise<ServiceResponseHttpModel> {
    const complexTimeline = await this.complexScheduleRepository.preload({
      id,
      ...payload,
    });

    if (!complexTimeline) {
      throw new NotFoundException('Format not found');
    }
    const complexTimelineUpdated = await this.complexScheduleRepository.save(
      complexTimeline,
    );

    return {
      data: plainToInstance(ReadComplexScheduleDto, complexTimelineUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.complexScheduleRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.complexScheduleRepository.softRemove(
      format,
    );

    return { data: plainToInstance(ReadComplexScheduleDto, formatDeleted) };
  }

  async removeAll(
    payload: ComplexScheduleEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.complexScheduleRepository.softRemove(
      payload,
    );
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterComplexScheduleDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ComplexScheduleEntity>
      | FindOptionsWhere<ComplexScheduleEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ activity: ILike(`%${search}%`) });
    }

    const response = await this.complexScheduleRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadComplexScheduleDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
