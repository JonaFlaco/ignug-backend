import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { IndividualDefenseEntity } from '../entities/individual-defense.entity';
import {
  CreateIndividualDefenseDto,
  FilterIndividualDefenseDto,
  ReadIndividualDefenseDto,
  UpdateIndividualDefenseDto,
} from '@uic/dto';

@Injectable()
export class IndividualDefensesService {
  constructor(
    @Inject(RepositoryEnum.INDIVIDUAL_DEFENSE_REPOSITORY)
    private individualDefenseRepository: Repository<IndividualDefenseEntity>,
  ) {}

  async create(
    payload: CreateIndividualDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    const newIndividualDefense =
      this.individualDefenseRepository.create(payload);
    const individualDefenseCreated =
      await this.individualDefenseRepository.save(newIndividualDefense);

    return {
      data: plainToInstance(ReadIndividualDefenseDto, individualDefenseCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.individualDefenseRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterIndividualDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.individualDefenseRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadIndividualDefenseDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const individualDefense = await this.individualDefenseRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!individualDefense) {
      throw new NotFoundException('Notes not found');
    }
    return {
      data: plainToInstance(ReadIndividualDefenseDto, individualDefense),
    };
  }

  async update(
    id: string,
    payload: UpdateIndividualDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    const individualDefense = await this.individualDefenseRepository.preload({
      id,
      ...payload,
    });

    if (!individualDefense) {
      throw new NotFoundException('Notes Weight not found');
    }
    const individualDefenseUpdated =
      await this.individualDefenseRepository.save(individualDefense);

    return {
      data: plainToInstance(ReadIndividualDefenseDto, individualDefenseUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const individualDefense = await this.individualDefenseRepository.findOneBy({
      id,
    });

    if (!individualDefense) {
      throw new NotFoundException('Notes Weight not found');
    }
    const individualDefenseDeleted =
      await this.individualDefenseRepository.softRemove(individualDefense);

    return {
      data: plainToInstance(ReadIndividualDefenseDto, individualDefenseDeleted),
    };
  }

  async removeAll(
    payload: IndividualDefenseEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const individualDefensesDeleted =
      await this.individualDefenseRepository.softRemove(payload);
    return { data: individualDefensesDeleted };
  }

  private async paginateAndFilter(
    params: FilterIndividualDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<IndividualDefenseEntity>
      | FindOptionsWhere<IndividualDefenseEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ title: ILike(`%${search}%`) });
    }

    const response = await this.individualDefenseRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadIndividualDefenseDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
