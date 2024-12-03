import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateScheduleActivityDto,
  ReadScheduleActivityDto,
  FilterScheduleActivityDto,
  UpdateScheduleActivityDto,
} from '@uic/dto';
import { ScheduleActivityEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { PayloadTokenModel } from '@auth/models';

@Injectable()
export class ScheduleActivitiesService {
  getScheduleActivitysForSidebar() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(RepositoryEnum.SCHEDULE_ACTIVITY_REPOSITORY)
    private scheduleActivityRepository: Repository<ScheduleActivityEntity>,
  ) {}

  async create(
    payload: CreateScheduleActivityDto,
  ): Promise<ServiceResponseHttpModel> {
    const newScheduleActivity = this.scheduleActivityRepository.create(payload);
    const scheduleActivityCreated = await this.scheduleActivityRepository.save(
      newScheduleActivity,
    );

    return {
      data: plainToInstance(ReadScheduleActivityDto, scheduleActivityCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.scheduleActivityRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterScheduleActivityDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.scheduleActivityRepository.findAndCount({
      // relations:{
      //   state: true
      // },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadScheduleActivityDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const scheduleActivity = await this.scheduleActivityRepository.findOneBy({
      id,
    });

    if (!scheduleActivity) {
      throw new NotFoundException('ScheduleActivity not found');
    }
    return { data: plainToInstance(ReadScheduleActivityDto, scheduleActivity) };
  }

  async update(
    id: string,
    payload: UpdateScheduleActivityDto,
  ): Promise<ServiceResponseHttpModel> {
    const scheduleActivity = await this.scheduleActivityRepository.preload({
      id,
      ...payload,
    });

    if (!scheduleActivity) {
      throw new NotFoundException('ScheduleActivity not found');
    }
    const scheduleActivityUpdated = await this.scheduleActivityRepository.save(
      scheduleActivity,
    );

    return {
      data: plainToInstance(ReadScheduleActivityDto, scheduleActivityUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const scheduleActivity = await this.scheduleActivityRepository.findOneBy({
      id,
    });

    if (!scheduleActivity) {
      throw new NotFoundException('ScheduleActivity not found');
    }
    const scheduleActivityDelete =
      await this.scheduleActivityRepository.softRemove(scheduleActivity);

    return {
      data: plainToInstance(ReadScheduleActivityDto, scheduleActivityDelete),
    };
  }

  async removeAll(
    payload: ScheduleActivityEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const scheduleActivitysDeleted =
      await this.scheduleActivityRepository.softRemove(payload);
    return { data: scheduleActivitysDeleted };
  }

  private async paginateAndFilter(
    params: FilterScheduleActivityDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ScheduleActivityEntity>
      | FindOptionsWhere<ScheduleActivityEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      //where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.scheduleActivityRepository.findAndCount({
      where,
      // relations:{
      //   state: true
      // },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadScheduleActivityDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
