import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CoordinatorEntity } from '@uic/entities';
import { ReadRequirementDto } from '../dto/requirements/read-requirement.dto';
import {
  CreateCoordinatorDto,
  FilterCoordinatorDto,
  ReadCoordinatorDto,
  UpdateCoordinatorDto,
} from '@uic/dto';

@Injectable()
export class CoordinatorsService {
  constructor(
    @Inject(RepositoryEnum.COORDINATOR_REPOSITORY)
    private repository: Repository<CoordinatorEntity>,
  ) {}

  async create(
    payload: CreateCoordinatorDto,
  ): Promise<ServiceResponseHttpModel> {
    const newCoodinator = this.repository.create(payload);
    const coodinatorCreated = await this.repository.save(newCoodinator);

    return { data: plainToInstance(ReadCoordinatorDto, coodinatorCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterCoordinatorDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadCoordinatorDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const coordinator = await this.repository.findOne({
      where: { id },
    });

    if (!coordinator) {
      throw new NotFoundException('Project Plan not found');
    }

    return { data: plainToInstance(ReadCoordinatorDto, coordinator) };
  }

  //Metodo Update
  async update(
    id: string,
    payload: UpdateCoordinatorDto,
  ): Promise<ServiceResponseHttpModel> {
    const coordinator = await this.repository.preload({ id, ...payload });

    if (!coordinator) {
      throw new NotFoundException('Project Plan not found');
    }

    const coordinatorUpdated = await this.repository.save(coordinator);

    return { data: plainToInstance(ReadCoordinatorDto, coordinatorUpdated) };
  }

  //Metodo Register Coordinator
  async registerCoordinator(
    payload: CreateCoordinatorDto,
  ): Promise<ServiceResponseHttpModel> {
    const newRequirement = this.repository.create(payload);
    const requirementCreated = await this.repository.save(newRequirement);

    return { data: plainToInstance(ReadRequirementDto, requirementCreated) };
  }

  //Metodo Notificar
  async notifyCoordinator(id: string): Promise<ServiceResponseHttpModel> {
    const newMessage = await this.repository.findOneBy({ id });
    //const requirementCreated = await this.repository.save(newMessage);

    return { data: plainToInstance(ReadRequirementDto, newMessage) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const coordinator = await this.repository.findOneBy({ id });

    if (!coordinator) {
      throw new NotFoundException('Project Plan not found');
    }

    const coordinatorDeleted = await this.repository.softRemove(coordinator);

    return { data: plainToInstance(ReadCoordinatorDto, coordinatorDeleted) };
  }

  async removeAll(
    payload: CoordinatorEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const coordinatorsDeleted = await this.repository.softRemove(payload);
    return { data: coordinatorsDeleted };
  }

  private async paginateAndFilter(
    params: FilterCoordinatorDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CoordinatorEntity>
      | FindOptionsWhere<CoordinatorEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ title: ILike(`%${search}%`) });
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
      data: plainToInstance(ReadCoordinatorDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
