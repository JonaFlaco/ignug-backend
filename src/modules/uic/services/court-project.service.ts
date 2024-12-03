import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { CourtProjectEntity } from '@uic/entities';
import {
  CreateCourtProjectDto,
  FilterCourtProjectDto,
  ReadCourtProjectDto,
  UpdateCourtProjectDto,
} from '@uic/dto';

@Injectable()
export class CourtProjectsService {
  constructor(
    @Inject(RepositoryEnum.COURT_PROJECT)
    private courtProjectRepository: Repository<CourtProjectEntity>,
  ) {}

  async create(
    payload: CreateCourtProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    const newCourtProject = this.courtProjectRepository.create(payload);
    const courtProjectCreated = await this.courtProjectRepository.save(
      newCourtProject,
    );

    return { data: plainToInstance(ReadCourtProjectDto, courtProjectCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.courtProjectRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterCourtProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.courtProjectRepository.findAndCount({
      relations: { proyect: true },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadCourtProjectDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const courtProject = await this.courtProjectRepository.findOne({
      where: { id },
      relations: { proyect: true },
    });

    if (!courtProject) {
      throw new NotFoundException('Teachernot found');
    }
    return { data: plainToInstance(ReadCourtProjectDto, courtProject) };
  }

  async update(
    id: string,
    payload: UpdateCourtProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    const courtProject = await this.courtProjectRepository.preload({
      id,
      ...payload,
    });

    if (!courtProject) {
      throw new NotFoundException('CourtProject not found');
    }
    const teacherUpdated = await this.courtProjectRepository.save(courtProject);

    return { data: plainToInstance(ReadCourtProjectDto, teacherUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const courtProject = await this.courtProjectRepository.findOneBy({ id });

    if (!courtProject) {
      throw new NotFoundException('CourtProject not found');
    }
    const teacherDeleted = await this.courtProjectRepository.softRemove(
      courtProject,
    );

    return { data: plainToInstance(ReadCourtProjectDto, teacherDeleted) };
  }

  async removeAll(
    payload: CourtProjectEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const teachersDeleted = await this.courtProjectRepository.softRemove(
      payload,
    );
    return { data: teachersDeleted };
  }

  private async paginateAndFilter(
    params: FilterCourtProjectDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CourtProjectEntity>
      | FindOptionsWhere<CourtProjectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ proyect: ILike(`%${search}%`) });
      where.push({ description: ILike(`%${search}%`) });
      where.push({ tribunal: ILike(`%${search}%`) });
    }

    const response = await this.courtProjectRepository.findAndCount({
      where,
      relations: { proyect: true },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadCourtProjectDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
