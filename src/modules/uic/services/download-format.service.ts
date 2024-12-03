import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { DownloadFormatEntity } from '@uic/entities';
import {
  UpdateDownloadFormatDto,
  FilterDownloadFormatDto,
  ReadDownloadFormatDto,
  CreateDownloadFormatDto,
} from '@uic/dto';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DownloadFormatsService {
  constructor(
    @Inject(RepositoryEnum.DOWNLOAD_FORMAT_REPOSITORY)
    private downloadFormatRepository: Repository<DownloadFormatEntity>,
  ) {}

  async create(
    payload: CreateDownloadFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    const newDownloadFormat = this.downloadFormatRepository.create(payload);
    const dowloadFormatCreated = await this.downloadFormatRepository.save(
      newDownloadFormat,
    );

    return {
      data: plainToInstance(ReadDownloadFormatDto, dowloadFormatCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.downloadFormatRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterDownloadFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.downloadFormatRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadDownloadFormatDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.downloadFormatRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadDownloadFormatDto, format) };
  }

  async update(
    id: string,
    payload: UpdateDownloadFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    const dowloadFormat = await this.downloadFormatRepository.preload({
      id,
      ...payload,
    });

    if (!dowloadFormat) {
      throw new NotFoundException('Format not found');
    }
    const downloadFormatUpdated = await this.downloadFormatRepository.save(
      dowloadFormat,
    );

    return {
      data: plainToInstance(ReadDownloadFormatDto, downloadFormatUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.downloadFormatRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.downloadFormatRepository.softRemove(
      format,
    );

    return { data: plainToInstance(ReadDownloadFormatDto, formatDeleted) };
  }

  async removeAll(
    payload: DownloadFormatEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.downloadFormatRepository.softRemove(
      payload,
    );
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterDownloadFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DownloadFormatEntity>
      | FindOptionsWhere<DownloadFormatEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.downloadFormatRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadDownloadFormatDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  filesBuffer(file: string) {
    const filename = file;
    return readFileSync(join(process.cwd(), filename));
  }
}
