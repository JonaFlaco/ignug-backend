import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '@core/dto';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { ItemEntity } from '@uic/entities';
import {
  FilterItemDto,
  ReadItemDto,
  UpdateItemDto,
  CreateItemDto,
} from '@uic/dto';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(RepositoryEnum.ITEM_REPOSITORY)
    private repository: Repository<ItemEntity>,
  ) {}

  async create(payload: CreateItemDto): Promise<ServiceResponseHttpModel> {
    const newItem = this.repository.create(payload);
    const itemCreated = await this.repository.save(newItem);

    return { data: plainToInstance(ReadItemDto, itemCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterItemDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: {
        career: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadItemDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const item = await this.repository.findOne({
      where: { id },
      relations: {
        career: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Item uic not found');
    }

    return { data: plainToInstance(ReadItemDto, item) };
  }

  async update(
    id: string,
    payload: UpdateItemDto,
  ): Promise<ServiceResponseHttpModel> {
    const item = await this.repository.preload({ id, ...payload });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const itemUpdated = await this.repository.save(item);

    return { data: plainToInstance(ReadItemDto, itemUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const item = await this.repository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('item not found');
    }

    const itemDeleted = await this.repository.softRemove(item);

    return { data: plainToInstance(ReadItemDto, itemDeleted) };
  }

  async removeAll(payload: ItemEntity[]): Promise<ServiceResponseHttpModel> {
    const itemsDeleted = await this.repository.softRemove(payload);
    return { data: itemsDeleted };
  }

  private async paginateAndFilter(
    params: FilterItemDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<ItemEntity> | FindOptionsWhere<ItemEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        career: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadItemDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
