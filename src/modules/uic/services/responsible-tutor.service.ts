import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateResponsibleTutorDto,
  FilterResponsibleTutorDto,
  ReadResponsibleTutorDto,
  UpdateResponsibleTutorDto,
} from '@uic/dto';
import { ResponsibleTutorEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class ResponsibleTutorsService {
  constructor(
    @Inject(RepositoryEnum.RESPONSIBLE_TUTOR_REPOSITORY)
    private repository: Repository<ResponsibleTutorEntity>,
  ) {}
  async create(payload: CreateResponsibleTutorDto): Promise<ServiceResponseHttpModel> {
    const newResponsibleTutor = this.repository.create(payload);
    const responsibleTutorCreated = await this.repository.save(newResponsibleTutor);

    return { data: plainToInstance(ReadResponsibleTutorDto, responsibleTutorCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getResponsibleTutorsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(params?: FilterResponsibleTutorDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
       nameStudent: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadResponsibleTutorDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const responsibleTutor = await this.repository.findOne({
      where: { id },
      relations: {nameStudent: true },
    });

    if (!responsibleTutor) {
      throw new NotFoundException('ResponsibleTutor not found');
    }
    return { data: plainToInstance(ReadResponsibleTutorDto, responsibleTutor) };
  }
  async update(
    id: string,
    payload: UpdateResponsibleTutorDto,
  ): Promise<ServiceResponseHttpModel> {
    const responsibleTutor = await this.repository.preload({ id, ...payload});

    if (!responsibleTutor) {
      throw new NotFoundException('ResponsibleTutor not found');
    }
    const responsibleTutorUpdated = await this.repository.save(responsibleTutor);

    return { data: plainToInstance(ReadResponsibleTutorDto, responsibleTutorUpdated) };
  }
  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const responsibleTutor = await this.repository.findOneBy({ id });

    if (!responsibleTutor) {
      throw new NotFoundException('ResponsibleTutor not found');
    }
    const responsibleTutorDelete = await this.repository.softRemove(responsibleTutor);

    return { data: plainToInstance(ReadResponsibleTutorDto, responsibleTutorDelete) };
  }
  async removeAll(
    payload: ResponsibleTutorEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const responsibleTutorsDeleted = await this.repository.softRemove(payload);
    return { data: responsibleTutorsDeleted };
  }
  private async paginateAndFilter(
    params: FilterResponsibleTutorDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ResponsibleTutorEntity>
      | FindOptionsWhere<ResponsibleTutorEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({nameStudent: ILike(`%${search}%`) });//REVISAR ANTES ESTABA SOLO NAME Y PUSE NameEstudiante
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
       nameStudent: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadResponsibleTutorDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
