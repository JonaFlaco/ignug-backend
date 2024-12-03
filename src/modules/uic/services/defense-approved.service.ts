import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DefenseApprovedEntity } from '../entities/defense-approved.entity';
import {
  CreateDefenseApprovedDto,
  FilterDefenseApprovedDto,
  ReadDefenseApprovedDto,
  UpdateDefenseApprovedDto,
} from '@uic/dto';

@Injectable()
export class DefenseApprovedsService {
  constructor(
    @Inject(RepositoryEnum.DEFENSE_APPROVED_REPOSITORY)
    private defenseApprovedRepository: Repository<DefenseApprovedEntity>,
  ) {}

  async create(
    payload: CreateDefenseApprovedDto,
  ): Promise<ServiceResponseHttpModel> {
    const newDefenseApproved = this.defenseApprovedRepository.create(payload);
    const defenseApprovedCreated = await this.defenseApprovedRepository.save(
      newDefenseApproved,
    );

    return {
      data: plainToInstance(ReadDefenseApprovedDto, defenseApprovedCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.defenseApprovedRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterDefenseApprovedDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.defenseApprovedRepository.findAndCount({
      relations: { student: true, rating: true },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadDefenseApprovedDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.defenseApprovedRepository.findOne({
      where: { id },
      relations: { student: true, rating: true },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadDefenseApprovedDto, format) };
  }

  async update(
    id: string,
    payload: UpdateDefenseApprovedDto,
  ): Promise<ServiceResponseHttpModel> {
    const dowloadFormat = await this.defenseApprovedRepository.preload({
      id,
      ...payload,
    });

    if (!dowloadFormat) {
      throw new NotFoundException('Format not found');
    }
    const defenseApprovedUpdated = await this.defenseApprovedRepository.save(
      dowloadFormat,
    );

    return {
      data: plainToInstance(ReadDefenseApprovedDto, defenseApprovedUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.defenseApprovedRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.defenseApprovedRepository.softRemove(
      format,
    );

    return { data: plainToInstance(ReadDefenseApprovedDto, formatDeleted) };
  }

  async removeAll(
    payload: DefenseApprovedEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.defenseApprovedRepository.softRemove(
      payload,
    );
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterDefenseApprovedDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DefenseApprovedEntity>
      | FindOptionsWhere<DefenseApprovedEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.defenseApprovedRepository.findAndCount({
      where,
      relations: { student: true, rating: true },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadDefenseApprovedDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  filesBuffer(file: string) {
    const filename = file;
    return readFileSync(join(process.cwd(), filename));
  }
}
