import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateProjectBenchDto,
  ReadProjectBenchDto,
  FilterProjectBenchDto,
  UpdateProjectBenchDto,
} from '@uic/dto';
import { ProjectBenchEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { PayloadTokenModel } from '@auth/models';

@Injectable()
export class ProjectBenchsService {
  getProjectBenchsForSidebar() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(RepositoryEnum.PROJECT_BENCH_REPOSITORY)
    private projectBenchRepository: Repository<ProjectBenchEntity>,
  ) {}

  async create(
    payload: CreateProjectBenchDto,
  ): Promise<ServiceResponseHttpModel> {
    const newProjectBench = this.projectBenchRepository.create(payload);
    const projectBenchCreated = await this.projectBenchRepository.save(
      newProjectBench,
    );

    return { data: plainToInstance(ReadProjectBenchDto, projectBenchCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.projectBenchRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterProjectBenchDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.projectBenchRepository.findAndCount({
       relations:{
        teacher: true,
       },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadProjectBenchDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const projectBench = await this.projectBenchRepository.findOneBy({ id });

    if (!projectBench) {
      throw new NotFoundException('ProjectBench not found');
    }
    return { data: plainToInstance(ReadProjectBenchDto, projectBench) };
  }

  async update(
    id: string,
    payload: UpdateProjectBenchDto,
  ): Promise<ServiceResponseHttpModel> {
    const projectBench = await this.projectBenchRepository.preload({
      id,
      ...payload,
    });

    if (!projectBench) {
      throw new NotFoundException('ProjectBench not found');
    }
    const projectBenchUpdated = await this.projectBenchRepository.save(
      projectBench,
    );

    return { data: plainToInstance(ReadProjectBenchDto, projectBenchUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const projectBench = await this.projectBenchRepository.findOneBy({ id });

    if (!projectBench) {
      throw new NotFoundException('ProjectBench not found');
    }
    const projectBenchDelete = await this.projectBenchRepository.softRemove(
      projectBench,
    );

    return { data: plainToInstance(ReadProjectBenchDto, projectBenchDelete) };
  }

  async removeAll(
    payload: ProjectBenchEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const projectBenchsDeleted = await this.projectBenchRepository.softRemove(
      payload,
    );
    return { data: projectBenchsDeleted };
  }

  private async paginateAndFilter(
    params: FilterProjectBenchDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ProjectBenchEntity>
      | FindOptionsWhere<ProjectBenchEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.projectBenchRepository.findAndCount({
      where,
       relations:{
        teacher: true
       },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadProjectBenchDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
