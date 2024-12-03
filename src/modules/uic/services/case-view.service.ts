import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { CaseViewEntity } from '@uic/entities';
import {
  CreateCaseViewDto,
  FilterCaseViewDto,
  ReadCaseViewDto,
  UpdateCaseViewDto,
} from '@uic/dto';

@Injectable()
export class CaseViewsService {
  constructor(
    @Inject(RepositoryEnum.CASE_VIEW_REPOSITORY)
    private caseViewRepository: Repository<CaseViewEntity>,
  ) {}

  async create(payload: CreateCaseViewDto): Promise<ServiceResponseHttpModel> {
    const newCaseView = this.caseViewRepository.create(payload);
    const caseViewCreated = await this.caseViewRepository.save(newCaseView);

    return {
      data: plainToInstance(ReadCaseViewDto, caseViewCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.caseViewRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterCaseViewDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.caseViewRepository.findAndCount({
      relations: {
        // caseView: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadCaseViewDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.caseViewRepository.findOne({
      where: { id },
      relations: {
        // caseView: true,
      },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadCaseViewDto, format) };
  }

  async update(
    id: string,
    payload: UpdateCaseViewDto,
  ): Promise<ServiceResponseHttpModel> {
    const caseView = await this.caseViewRepository.preload({
      id,
      ...payload,
    });

    if (!caseView) {
      throw new NotFoundException('Format not found');
    }
    const caseViewUpdated = await this.caseViewRepository.save(caseView);

    return {
      data: plainToInstance(ReadCaseViewDto, caseViewUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.caseViewRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.caseViewRepository.softRemove(format);

    return { data: plainToInstance(ReadCaseViewDto, formatDeleted) };
  }

  async removeAll(
    payload: CaseViewEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.caseViewRepository.softRemove(payload);
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterCaseViewDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CaseViewEntity>
      | FindOptionsWhere<CaseViewEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ activity: ILike(`%${search}%`) });
    }

    const response = await this.caseViewRepository.findAndCount({
      where,
      relations: {
        // caseView: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadCaseViewDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
