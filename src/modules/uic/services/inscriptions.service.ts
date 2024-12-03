import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateInscriptionDto,
  FilterInscriptionDto,
  ReadInscriptionDto,
  UpdateInscriptionDto,
} from '@uic/dto';
import { InscriptionEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';
import { StatusEnum } from '../enums';

@Injectable()
export class InscriptionsService {
  constructor(
    @Inject(RepositoryEnum.INSCRIPTION_REPOSITORY)
    private repository: Repository<InscriptionEntity>,
  ) {}

  async create(
    payload: CreateInscriptionDto,
  ): Promise<ServiceResponseHttpModel> {
    const newInscription = this.repository.create(payload);
    const inscriptionCreated = await this.repository.save(newInscription);

    return { data: plainToInstance(ReadInscriptionDto, inscriptionCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterInscriptionDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadInscriptionDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const inscription = await this.repository.findOne({
      where: { id },
      relations: {},
    });

    if (!inscription) {
      throw new NotFoundException('inscription not found');
    }

    return { data: plainToInstance(ReadInscriptionDto, inscription) };
  }

  async update(
    id: string,
    payload: UpdateInscriptionDto,
  ): Promise<ServiceResponseHttpModel> {
    const inscription = await this.repository.preload({ id, ...payload });

    if (!inscription) {
      throw new NotFoundException('Inscription not found');
    }
    /*if (inscription.isEnable == null) {
      inscription.isEnable = StatusEnum.WAITING;
    }*/

    const inscriptionUpdated = await this.repository.save(inscription);

    return { data: plainToInstance(ReadInscriptionDto, inscriptionUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const inscription = await this.repository.findOneBy({ id });

    if (!inscription) {
      throw new NotFoundException('Inscription not found');
    }

    const inscriptionDeleted = await this.repository.softRemove(inscription);

    return { data: plainToInstance(ReadInscriptionDto, inscriptionDeleted) };
  }

  async removeAll(
    payload: InscriptionEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const inscriptionsDeleted = await this.repository.softRemove(payload);
    return { data: inscriptionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterInscriptionDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<InscriptionEntity>
      | FindOptionsWhere<InscriptionEntity>[];
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
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadInscriptionDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
