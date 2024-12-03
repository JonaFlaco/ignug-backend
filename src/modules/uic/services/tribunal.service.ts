import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateTribunalDto,
  FilterTribunalDto,
  ReadTribunalDto,
  UpdateTribunalDto,
} from '@uic/dto';
import { TribunalEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class TribunalsService {
  constructor(
    @Inject(RepositoryEnum.TRIBUNAL_REPOSITORY)
    private repository: Repository<TribunalEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateTribunalDto): Promise<ServiceResponseHttpModel> {
    const newTribunal = this.repository.create(payload);
    const tribunalCreated = await this.repository.save(newTribunal);

    return { data: plainToInstance(ReadTribunalDto, tribunalCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterTribunalDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    // //Other filters
    // if (params.score) {
    //   return this.filterBySort(params.score);
    // }

    //All
    const response = await this.repository.findAndCount({
      relations: {
        name: true,
        tutor: true,
        vocal: true,
        president: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadTribunalDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const tribunal = await this.repository.findOne({
      where: { id },
      relations: {
        name: true,
        tutor: true,
        vocal: true,
        president: true,
      },
    });

    if (!tribunal) {
      throw new NotFoundException('tribunal not found');
    }

    return { data: plainToInstance(ReadTribunalDto, tribunal) };
  }

  async update(
    id: string,
    payload: UpdateTribunalDto,
  ): Promise<ServiceResponseHttpModel> {
    const tribunal = await this.repository.preload({ id, ...payload });

    if (!tribunal) {
      throw new NotFoundException('Tribunal not found');
    }

    const tribunalUpdated = await this.repository.save(tribunal);

    return { data: plainToInstance(ReadTribunalDto, tribunalUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const tribunal = await this.repository.findOneBy({ id });

    if (!tribunal) {
      throw new NotFoundException('Tribunal not found');
    }

    const tribunalDeleted = await this.repository.softRemove(tribunal);

    return { data: plainToInstance(ReadTribunalDto, tribunalDeleted) };
  }

  async removeAll(
    payload: TribunalEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const tribunalsDeleted = await this.repository.softRemove(payload);
    return { data: tribunalsDeleted };
  }

  private async paginateAndFilter(
    params: FilterTribunalDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TribunalEntity>
      | FindOptionsWhere<TribunalEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ place: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {
        name: true,
        tutor: true,
        vocal: true,
        president: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadTribunalDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByNombre(
    place: string,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<TribunalEntity> = {};

    if (place) {
      where.name = LessThan(place);
    }

    const response = await this.repository.findAndCount({
      relations: [],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
