import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateComplexivoDto,
  FilterComplexivoDto,
  ReadComplexivoDto,
  UpdateComplexivoDto,
} from '@uic/dto';
import { ComplexivoEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class ComplexivosService {
  constructor(
    @Inject(RepositoryEnum.COMPLEXIVO_REPOSITORY)
    private repository: Repository<ComplexivoEntity>,
  ) {}
  async create(payload: CreateComplexivoDto): Promise<ServiceResponseHttpModel> {
    const newComplexivo = this.repository.create(payload);
    const complexivoCreated = await this.repository.save(newComplexivo);

    return { data: plainToInstance(ReadComplexivoDto, complexivoCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getComplexivosForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(params?: FilterComplexivoDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        name: true,
        name2: true,
        tutor: true,
        vocal: true,
        president: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadComplexivoDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const complexivo = await this.repository.findOne({
      where: { id },
      relations: {
        name: true,
        name2: true,
        tutor: true,
        vocal: true,
        president: true,
      },
    });

    if (!complexivo) {
      throw new NotFoundException('Complexivo not found');
    }
    return { data: plainToInstance(ReadComplexivoDto, complexivo) };
  }

  async update(
    id: string,
    payload: UpdateComplexivoDto,
  ): Promise<ServiceResponseHttpModel> {
    const complexivo = await this.repository.preload({ id, ...payload });

    if (!complexivo) {
      throw new NotFoundException('Complexivo not found');
    }
    const complexivoUpdated = await this.repository.save(complexivo);

    return { data: plainToInstance(ReadComplexivoDto, complexivoUpdated) };
  }
  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const complexivo = await this.repository.findOneBy({ id });

    if (!complexivo) {
      throw new NotFoundException('Complexivo not found');
    }
    const complexivoDelete = await this.repository.softRemove(complexivo);

    return { data: plainToInstance(ReadComplexivoDto, complexivoDelete) };
  }
  async removeAll(
    payload: ComplexivoEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const complexivosDeleted = await this.repository.softRemove(payload);
    return { data: complexivosDeleted };
  }
  private async paginateAndFilter(
    params: FilterComplexivoDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ComplexivoEntity>
      | FindOptionsWhere<ComplexivoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nameCase: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        name: true,
        name2: true,
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
      data: plainToInstance(ReadComplexivoDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

}
