import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateRegisterDto,
  FilterRegisterDto,
  ReadRegisterDto,
  UpdateRegisterDto,
} from '@uic/dto';

import { PaginationDto } from '@core/dto';
import { RegisterEntity } from '@uic/entities';

@Injectable()
export class RegistersService {
  constructor(
    @Inject(RepositoryEnum.REGISTER_REPOSITORY)
    private repository: Repository<RegisterEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateRegisterDto): Promise<ServiceResponseHttpModel> {
    const newRegister = this.repository.create(payload);
    const signatureCreated = await this.repository.save(newRegister);

    return { data: plainToInstance(ReadRegisterDto, signatureCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterRegisterDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    // Other filters
    // if (params.name) {
    //   return this.filterBySort(params.name);
    // }

    //All
    const response = await this.repository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadRegisterDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.findOne({
      where: { id },
      relations: {},
    });

    if (!signature) {
      throw new NotFoundException('signature not found');
    }

    return { data: plainToInstance(ReadRegisterDto, signature) };
  }

  async update(
    id: string,
    payload: UpdateRegisterDto,
  ): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.preload({ id, ...payload });

    if (!signature) {
      throw new NotFoundException('Register not found');
    }

    const signatureUpdated = await this.repository.save(signature);

    return { data: plainToInstance(ReadRegisterDto, signatureUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.findOneBy({ id });

    if (!signature) {
      throw new NotFoundException('Register not found');
    }

    const signatureDeleted = await this.repository.softRemove(signature);

    return { data: plainToInstance(ReadRegisterDto, signatureDeleted) };
  }

  async removeAll(
    payload: RegisterEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const signaturesDeleted = await this.repository.softRemove(payload);
    return { data: signaturesDeleted };
  }

  private async paginateAndFilter(
    params: FilterRegisterDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RegisterEntity>
      | FindOptionsWhere<RegisterEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
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
      data: plainToInstance(ReadRegisterDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
