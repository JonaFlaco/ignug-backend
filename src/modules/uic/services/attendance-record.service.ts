import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateAttendanceRecordDto,
  ReadAttendanceRecordDto,
  FilterAttendanceRecordDto,
  UpdateAttendanceRecordDto,
} from '@uic/dto';
import { AttendanceRecordEntity } from '@uic/entities';
import { Repository, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @Inject(RepositoryEnum.ATTENDANCE_RECORD_REPOSITORY)
    private repository: Repository<AttendanceRecordEntity>,
  ) {}

  async create(
    payload: CreateAttendanceRecordDto,
  ): Promise<ServiceResponseHttpModel> {
    const newAttendanceRecord = this.repository.create(payload);
    const uploadAttendanceRecordCreated = await this.repository.save(
      newAttendanceRecord,
    );

    return {
      data: plainToInstance(
        ReadAttendanceRecordDto,
        uploadAttendanceRecordCreated,
      ),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getAttendanceRecordorSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterAttendanceRecordDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        planning: true,
        //name: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadAttendanceRecordDto, response[0]),
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
    const attendanceRecord = await this.repository.findOne({
      where: { id },
      relations: {
        planning: true,
      },
    });

    if (!attendanceRecord) {
      throw new NotFoundException('Upload not found');
    }
    return {
      data: plainToInstance(
        ReadAttendanceRecordDto,
       attendanceRecord,
      ),
    };
  }

  async update(
    id: string,
    payload: UpdateAttendanceRecordDto,
  ): Promise<ServiceResponseHttpModel> {
    const attendanceRecord = await this.repository.preload({
      id,
      ...payload,
    });

    if (!attendanceRecord) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const attendanceRecordUpdated = await this.repository.save(
      attendanceRecord,
    );

    return {
      data: plainToInstance(
        ReadAttendanceRecordDto,
        attendanceRecordUpdated,
      ),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const attendanceRecord = await this.repository.findOneBy({ id });

    if (!attendanceRecord) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const attendanceRecordDelete = await this.repository.softRemove(
      attendanceRecord,
    );

    return {
      data: plainToInstance(
        ReadAttendanceRecordDto,
        attendanceRecordDelete,
      ),
    };
  }

  async removeAll(
    payload: AttendanceRecordEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const attendanceRecordDeleted = await this.repository.softRemove(
      payload,
    );
    return { data: attendanceRecordDeleted };
  }

  private async paginateAndFilter(
    params: FilterAttendanceRecordDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<AttendanceRecordEntity>
      | FindOptionsWhere<AttendanceRecordEntity>[];
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
        //name: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadAttendanceRecordDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
