import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { ComplexTimelineEntity } from '@uic/entities';
import {
  CreateComplexTimelineDto,
  FilterComplexTimelineDto,
  ReadComplexTimelineDto,
  UpdateComplexTimelineDto,
} from '@uic/dto';

@Injectable()
export class ComplexTimelinesService {
  constructor(
    @Inject(RepositoryEnum.COMPLEX_TIMELINE)
    private complexTimelineRepository: Repository<ComplexTimelineEntity>,
  ) {}

  async create(
    payload: CreateComplexTimelineDto,
  ): Promise<ServiceResponseHttpModel> {
    const newComplexTimeline = this.complexTimelineRepository.create(payload);
    const complexTimelineCreated = await this.complexTimelineRepository.save(
      newComplexTimeline,
    );

    return {
      data: plainToInstance(ReadComplexTimelineDto, complexTimelineCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.complexTimelineRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterComplexTimelineDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.complexTimelineRepository.findAndCount({
      relations: {
        topicProject: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadComplexTimelineDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.complexTimelineRepository.findOne({
      where: { id },
      relations: {
        topicProject: true,
      },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadComplexTimelineDto, format) };
  }

  async update(
    id: string,
    payload: UpdateComplexTimelineDto,
  ): Promise<ServiceResponseHttpModel> {
    const complexTimeline = await this.complexTimelineRepository.preload({
      id,
      ...payload,
    });

    if (!complexTimeline) {
      throw new NotFoundException('Format not found');
    }
    const complexTimelineUpdated = await this.complexTimelineRepository.save(
      complexTimeline,
    );

    return {
      data: plainToInstance(ReadComplexTimelineDto, complexTimelineUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.complexTimelineRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.complexTimelineRepository.softRemove(
      format,
    );

    return { data: plainToInstance(ReadComplexTimelineDto, formatDeleted) };
  }

  async removeAll(
    payload: ComplexTimelineEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.complexTimelineRepository.softRemove(
      payload,
    );
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterComplexTimelineDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ComplexTimelineEntity>
      | FindOptionsWhere<ComplexTimelineEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ activity: ILike(`%${search}%`) });
    }

    const response = await this.complexTimelineRepository.findAndCount({
      where,
      relations: {
        topicProject: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadComplexTimelineDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
