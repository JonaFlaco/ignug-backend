import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { TeacherEntity } from '@uic/entities';
import {
  CreateTeacherDto,
  FilterTeacherDto,
  ReadTeacherDto,
  UpdateTeacherDto,
} from '@uic/dto';

@Injectable()
export class TeachersService {
  constructor(
    @Inject(RepositoryEnum.TEACHER_REPOSITORY)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async create(payload: CreateTeacherDto): Promise<ServiceResponseHttpModel> {
    const newTeacher = this.teacherRepository.create(payload);
    const teacherCreated = await this.teacherRepository.save(newTeacher);

    return { data: plainToInstance(ReadTeacherDto, teacherCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.teacherRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterTeacherDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.teacherRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadTeacherDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!teacher) {
      throw new NotFoundException('Teachernot found');
    }
    return { data: plainToInstance(ReadTeacherDto, teacher) };
  }

  async update(
    id: string,
    payload: UpdateTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    const teacher = await this.teacherRepository.preload({ id, ...payload });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    const teacherUpdated = await this.teacherRepository.save(teacher);

    return { data: plainToInstance(ReadTeacherDto, teacherUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    const teacherDeleted = await this.teacherRepository.softRemove(teacher);

    return { data: plainToInstance(ReadTeacherDto, teacherDeleted) };
  }

  async removeAll(payload: TeacherEntity[]): Promise<ServiceResponseHttpModel> {
    const teachersDeleted = await this.teacherRepository.softRemove(payload);
    return { data: teachersDeleted };
  }

  private async paginateAndFilter(
    params: FilterTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TeacherEntity>
      | FindOptionsWhere<TeacherEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ dni: ILike(`%${search}%`) });
    }

    const response = await this.teacherRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadTeacherDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
