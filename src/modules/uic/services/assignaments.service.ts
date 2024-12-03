import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateAssignamentDto,
  FilterAssignamentDto,
  ReadAssignamentDto,
  UpdateAssignamentDto,
} from '@uic/dto';
import { AssignamentEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class AssignamentsService {
  constructor(
    @Inject(RepositoryEnum.ASSIGNAMENT_REPOSITORY)
    private repository: Repository<AssignamentEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateAssignamentDto): Promise<ServiceResponseHttpModel> {
    const newAssignament = this.repository.create(payload);
    const assignamentCreated = await this.repository.save(newAssignament);

    return { data: plainToInstance(ReadAssignamentDto, assignamentCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }


  async findAll(params?: FilterAssignamentDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.sort) {
      return this.filterBySort(params.sort);
    }

    //All
    const response = await this.repository.findAndCount({
      
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadAssignamentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const assignament = await this.repository.findOne({
      where: { id },
      
    });

    if (!assignament) {
      throw new NotFoundException('assignament not found');
    }

    return { data: plainToInstance(ReadAssignamentDto, assignament) };
  }

  async update(
    id: string,
    payload: UpdateAssignamentDto,
  ): Promise<ServiceResponseHttpModel> {
    const assignament = await this.repository.preload({ id, ...payload });

    if (!assignament) {
      throw new NotFoundException('Assignament not found');
    }

    const assignamentUpdated = await this.repository.save(assignament);

    return { data: plainToInstance(ReadAssignamentDto, assignamentUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const assignament = await this.repository.findOneBy({ id });

    if (!assignament) {
      throw new NotFoundException('Assignament not found');
    }

    const assignamentDeleted = await this.repository.softRemove(assignament);

    return { data: plainToInstance(ReadAssignamentDto, assignamentDeleted) };
  }

  async removeAll(payload: AssignamentEntity[]): Promise<ServiceResponseHttpModel> {
    const assignamentsDeleted = await this.repository.softRemove(payload);
    return { data: assignamentsDeleted };
  }

  private async paginateAndFilter(
    params: FilterAssignamentDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<AssignamentEntity> | FindOptionsWhere<AssignamentEntity>[];
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
      
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadAssignamentDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterBySort(sort: number): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<AssignamentEntity> = {};

    if (sort) {
      where.sort = LessThan(sort);
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
