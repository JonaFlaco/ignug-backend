import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { MemorandumEntity } from '@uic/entities';
import {
  CreateMemorandumDto,
  FilterMemorandumDto,
  ReadMemorandumDto,
  UpdateMemorandumDto,
} from '@uic/dto';

@Injectable()
export class MemorandumsService {
  constructor(
    @Inject(RepositoryEnum.MEMORANDUM_REPOSITORY)
    private memorandumRepository: Repository<MemorandumEntity>,
  ) {}

  async create(
    payload: CreateMemorandumDto,
  ): Promise<ServiceResponseHttpModel> {
    const newMemorandum = this.memorandumRepository.create(payload);
    const memorandumCreated = await this.memorandumRepository.save(
      newMemorandum,
    );

    return { data: plainToInstance(ReadMemorandumDto, memorandumCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.memorandumRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterMemorandumDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.memorandumRepository.findAndCount({
      relations: {
        nameStudent: true,
        nameTeacher: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadMemorandumDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const memorandum = await this.memorandumRepository.findOne({
      where: { id },
      relations: {
        nameStudent: true,
        nameTeacher: true,
      },
    });

    if (!memorandum) {
      throw new NotFoundException('memorandum not found');
    }
    return { data: plainToInstance(ReadMemorandumDto, memorandum) };
  }

  async update(
    id: string,
    payload: UpdateMemorandumDto,
  ): Promise<ServiceResponseHttpModel> {
    const memorandum = await this.memorandumRepository.preload({
      id,
      ...payload,
    });

    if (!memorandum) {
      throw new NotFoundException('memorandum not found');
    }
    const memorandumUpdated = await this.memorandumRepository.save(memorandum);

    return { data: plainToInstance(ReadMemorandumDto, memorandumUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const memorandum = await this.memorandumRepository.findOneBy({ id });

    if (!memorandum) {
      throw new NotFoundException('memorandum not found');
    }
    const memorandumDeleted = await this.memorandumRepository.softRemove(
      memorandum,
    );

    return { data: plainToInstance(ReadMemorandumDto, memorandumDeleted) };
  }

  async removeAll(
    payload: MemorandumEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const memorandumsDeleted = await this.memorandumRepository.softRemove(
      payload,
    );
    return { data: memorandumsDeleted };
  }

  private async paginateAndFilter(
    params: FilterMemorandumDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<MemorandumEntity>
      | FindOptionsWhere<MemorandumEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ type: ILike(`%${search}%`) });
    }

    const response = await this.memorandumRepository.findAndCount({
      where,
      relations: {
        nameStudent: true,
        nameTeacher: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadMemorandumDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
