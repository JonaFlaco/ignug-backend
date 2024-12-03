import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TotalCaseEntity } from '@uic/entities';
import {
  CreateTotalCaseDto,
  FilterTotalCaseDto,
  ReadTotalCaseDto,
  UpdateTotalCaseDto,
} from '@uic/dto';

@Injectable()
export class TotalCasesService {
  constructor(
    @Inject(RepositoryEnum.TOTAL_CASE_REPOSITORY)
    private totalCaseRepository: Repository<TotalCaseEntity>,
  ) {}

  async create(payload: CreateTotalCaseDto): Promise<ServiceResponseHttpModel> {
    const newTotalCase = this.totalCaseRepository.create(payload);
    const totalCaseCreated = await this.totalCaseRepository.save(newTotalCase);

    return {
      data: plainToInstance(ReadTotalCaseDto, totalCaseCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.totalCaseRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterTotalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.totalCaseRepository.findAndCount({
      relations: { student: true, setting: true, defense: true },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadTotalCaseDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.totalCaseRepository.findOne({
      where: { id },
      relations: { student: true, setting: true, defense: true },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadTotalCaseDto, format) };
  }

  async update(
    id: string,
    payload: UpdateTotalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    const dowloadFormat = await this.totalCaseRepository.preload({
      id,
      ...payload,
    });

    if (!dowloadFormat) {
      throw new NotFoundException('Format not found');
    }
    const totalCaseUpdated = await this.totalCaseRepository.save(dowloadFormat);

    return {
      data: plainToInstance(ReadTotalCaseDto, totalCaseUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.totalCaseRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.totalCaseRepository.softRemove(format);

    return { data: plainToInstance(ReadTotalCaseDto, formatDeleted) };
  }

  async removeAll(
    payload: TotalCaseEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.totalCaseRepository.softRemove(payload);
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterTotalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TotalCaseEntity>
      | FindOptionsWhere<TotalCaseEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.totalCaseRepository.findAndCount({
      where,
      relations: { student: true, setting: true, defense: true },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadTotalCaseDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
