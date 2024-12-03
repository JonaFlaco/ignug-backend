import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UploadProjectEntity } from '@uic/entities';
import {
  CreateUploadProjectDto,
  FilterUploadProjectDto,
  ReadUploadProjectDto,
  UpdateUploadProjectDto,
} from '@uic/dto';

@Injectable()
export class UploadProjectsService {
  constructor(
    @Inject(RepositoryEnum.UPLOAD_PROJECT_REPOSITORY)
    private uploadProjectRepository: Repository<UploadProjectEntity>,
  ) {}

  async create(
    payload: CreateUploadProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    const newUploadProject = this.uploadProjectRepository.create(payload);
    const uploadProjectCreated = await this.uploadProjectRepository.save(
      newUploadProject,
    );

    return {
      data: plainToInstance(ReadUploadProjectDto, uploadProjectCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.uploadProjectRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterUploadProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.uploadProjectRepository.findAndCount({
      relations: {
        nameCareer: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadUploadProjectDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.uploadProjectRepository.findOne({
      where: { id },
      relations: {
        nameCareer: true,
      },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadUploadProjectDto, format) };
  }

  async update(
    id: string,
    payload: UpdateUploadProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    const uploadProject = await this.uploadProjectRepository.preload({
      id,
      ...payload,
    });

    if (!uploadProject) {
      throw new NotFoundException('Format not found');
    }
    const uploadProjectUpdated = await this.uploadProjectRepository.save(
      uploadProject,
    );

    return {
      data: plainToInstance(ReadUploadProjectDto, uploadProjectUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.uploadProjectRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.uploadProjectRepository.softRemove(format);

    return { data: plainToInstance(ReadUploadProjectDto, formatDeleted) };
  }

  async removeAll(
    payload: UploadProjectEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.uploadProjectRepository.softRemove(
      payload,
    );
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterUploadProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<UploadProjectEntity>
      | FindOptionsWhere<UploadProjectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ theme: ILike(`%${search}%`) });
    }

    const response = await this.uploadProjectRepository.findAndCount({
      where,
      relations: {
        nameCareer: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadUploadProjectDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  filesBuffer(file: string) {
    const filename = file;
    return readFileSync(join(process.cwd(), filename));
  }
}
