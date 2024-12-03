import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateYearDto,
  FilterYearDto,
  ReadYearDto,
  UpdateYearDto,
  PaginationDto,
} from '@core/dto';
import { YearEntity } from '@core/entities';

@Injectable()
export class YearsService {
  constructor(
    @Inject(RepositoryEnum.YEAR_REPOSITORY)
    private repository: Repository<YearEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateYearDto): Promise<ServiceResponseHttpModel> {
    const newYear = this.repository.create(payload);
    const yearCreated = await this.repository.save(newYear);

    return { data: plainToInstance(ReadYearDto, yearCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterYearDto): Promise<ServiceResponseHttpModel> {
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
      relations: {
        // name: true,
        // planning: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadYearDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const year = await this.repository.findOne({
      where: { id },
      relations: {
        // name: true,
        // planning: true
      },
    });

    if (!year) {
      throw new NotFoundException('year not found');
    }

    return { data: plainToInstance(ReadYearDto, year) };
  }

  async update(
    id: string,
    payload: UpdateYearDto,
  ): Promise<ServiceResponseHttpModel> {
    const year = await this.repository.preload({ id, ...payload });

    if (!year) {
      throw new NotFoundException('Year not found');
    }

    const yearUpdated = await this.repository.save(year);

    return { data: plainToInstance(ReadYearDto, yearUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const year = await this.repository.findOneBy({ id });

    if (!year) {
      throw new NotFoundException('Year not found');
    }

    const yearDeleted = await this.repository.softRemove(year);

    return { data: plainToInstance(ReadYearDto, yearDeleted) };
  }

  async removeAll(payload: YearEntity[]): Promise<ServiceResponseHttpModel> {
    const yearsDeleted = await this.repository.softRemove(payload);
    return { data: yearsDeleted };
  }

  private async paginateAndFilter(
    params: FilterYearDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<YearEntity> | FindOptionsWhere<YearEntity>[];
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
      relations: {
        // name: true,
        // planning: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadYearDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
