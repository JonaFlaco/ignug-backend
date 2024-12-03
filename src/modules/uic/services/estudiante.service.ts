import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateEstudianteDto,
  FilterEstudianteDto,
  ReadEstudianteDto,
  UpdateEstudianteDto,
} from '@uic/dto';
import { EstudianteEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @Inject(RepositoryEnum.ESTUDIANTE_REPOSITORY)
    private repository: Repository<EstudianteEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateEstudianteDto,
  ): Promise<ServiceResponseHttpModel> {
    const newEstudiante = this.repository.create(payload);
    const estudianteCreated = await this.repository.save(newEstudiante);

    return { data: plainToInstance(ReadEstudianteDto, estudianteCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }


  async findAll(
    params?: FilterEstudianteDto,
  ): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.dni) {
      return this.filterBySort(params.dni);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: { 
        tutor: true, 
        },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadEstudianteDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const estudiante = await this.repository.findOne({
      where: { id },
      relations: { 
        tutor: true, 
        },
    });

    if (!estudiante) {
      throw new NotFoundException('estudiante not found');
    }

    return { data: plainToInstance(ReadEstudianteDto, estudiante) };
  }

  async update(
    id: string,
    payload: UpdateEstudianteDto,
  ): Promise<ServiceResponseHttpModel> {
    const estudiante = await this.repository.preload({ id, ...payload });

    if (!estudiante) {
      throw new NotFoundException('Estudiante not found');
    }

    const estudianteUpdated = await this.repository.save(estudiante);

    return { data: plainToInstance(ReadEstudianteDto, estudianteUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException('Estudiante not found');
    }

    const estudianteDeleted = await this.repository.softRemove(event);

    return { data: plainToInstance(ReadEstudianteDto, estudianteDeleted) };
  }

  async removeAll(
    payload: EstudianteEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const estudiantesDeleted = await this.repository.softRemove(payload);
    return { data: estudiantesDeleted };
  }

  private async paginateAndFilter(
    params: FilterEstudianteDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<EstudianteEntity>
      | FindOptionsWhere<EstudianteEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ dni: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: { 
        tutor: true, 
        },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadEstudianteDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterBySort(dni: string): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<EstudianteEntity> = {};

    if (dni) {
      where.dni = LessThan(dni);
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
