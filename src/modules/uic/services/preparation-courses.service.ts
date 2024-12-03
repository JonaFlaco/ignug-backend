import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreatePreparationCourseDto,
  FilterPreparationCourseDto,
  ReadPreparationCourseDto,
  UpdatePreparationCourseDto,
} from '@uic/dto';
import { PreparationCourseEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class PreparationCoursesService {
  constructor(
    @Inject(RepositoryEnum.PREPARATION_COURSE_REPOSITORY)
    private repository: Repository<PreparationCourseEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreatePreparationCourseDto,
  ): Promise<ServiceResponseHttpModel> {
    const newPreparationCourse = this.repository.create(payload);
    const preparationCourseCreated = await this.repository.save(newPreparationCourse);
    return { data: plainToInstance(ReadPreparationCourseDto, preparationCourseCreated) };
  }

  // catalogo
  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
 
  async findAll(
    params?: FilterPreparationCourseDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {
        year: true,
        career: true,
        planningName: true
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadPreparationCourseDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  private async paginateAndFilter(
    params: FilterPreparationCourseDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<PreparationCourseEntity>
      | FindOptionsWhere<PreparationCourseEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        year: true,
        career: true,
        planningName: true
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadPreparationCourseDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const PreparationCourse = await this.repository.findOne({
      where: { id },
      relations: {
        year: true,
        career: true,
        planningName: true
      },
    });

    if (!PreparationCourse) {
      throw new NotFoundException('PreparationCourse no encontrado');
    }

    return { data: plainToInstance(ReadPreparationCourseDto, PreparationCourse) };
  }

  async update(
    id: string,
    payload: UpdatePreparationCourseDto,
  ): Promise<ServiceResponseHttpModel> {
    const PreparationCourse = await this.repository.preload({ id, ...payload });

    if (!PreparationCourse) {
      throw new NotFoundException('PreparationCourse no encontrado');
    }

    const preparationCourseUpdated = await this.repository.save(PreparationCourse);

    return { data: plainToInstance(ReadPreparationCourseDto, preparationCourseUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const PreparationCourse = await this.repository.findOneBy({ id });

    if (!PreparationCourse) {
      throw new NotFoundException('PreparationCourse no encontrado');
    }

    const preparationCourseDeleted = await this.repository.softRemove(PreparationCourse);

    return { data: plainToInstance(ReadPreparationCourseDto, preparationCourseDeleted) };
  }

  async removeAll(
    payload: PreparationCourseEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const preparationCoursesDeleted = await this.repository.softRemove(payload);
    return { data: preparationCoursesDeleted };
  }

}
