import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreatePracticalCaseDto,
  FilterPracticalCaseDto,
  ReadPracticalCaseDto,
  UpdatePracticalCaseDto,
} from '@uic/dto';
import { PracticalCaseEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class PracticalCasesService {
  constructor(
    @Inject(RepositoryEnum.PRACTICAL_CASE_REPOSITORY)
    private repository: Repository<PracticalCaseEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreatePracticalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    const newPracticalCase = this.repository.create(payload);
    const practicalCaseCreated = await this.repository.save(newPracticalCase);
    return { data: plainToInstance(ReadPracticalCaseDto, practicalCaseCreated) };
  }

  // catalogo
  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
 
 
  async findAll(
    params?: FilterPracticalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {
        student: true,
        teacher: true,

      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadPracticalCaseDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  private async paginateAndFilter(
    params: FilterPracticalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<PracticalCaseEntity>
      | FindOptionsWhere<PracticalCaseEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ proyect: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        student: true,
        teacher: true
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadPracticalCaseDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  async findByPracticalCaseIdTimeline(
    id: string,
    params?: FilterPracticalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      where: [{ id: id } ],
      relations: {
        teacher: true,
        student:true,
      },
      order: { updatedAt: 'DESC' },
    });
    return {
      data: plainToInstance(ReadPracticalCaseDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const PracticalCase = await this.repository.findOne({
      where: { id },
      relations: {
        student: true,
        teacher: true
      },
    });

    if (!PracticalCase) {
      throw new NotFoundException('PracticalCase no encontrado');
    }

    return { data: plainToInstance(ReadPracticalCaseDto, PracticalCase) };
  }

  async update(
    id: string,
    payload: UpdatePracticalCaseDto,
  ): Promise<ServiceResponseHttpModel> {
    const PracticalCase = await this.repository.preload({ id, ...payload });

    if (!PracticalCase) {
      throw new NotFoundException('PracticalCase no encontrado');
    }

    const practicalCaseUpdated = await this.repository.save(PracticalCase);

    return { data: plainToInstance(ReadPracticalCaseDto, practicalCaseUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const PracticalCase = await this.repository.findOneBy({ id });

    if (!PracticalCase) {
      throw new NotFoundException('PracticalCase no encontrado');
    }

    const practicalCaseDeleted = await this.repository.softRemove(PracticalCase);

    return { data: plainToInstance(ReadPracticalCaseDto, practicalCaseDeleted) };
  }

  async removeAll(
    payload: PracticalCaseEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const practicalCasesDeleted = await this.repository.softRemove(payload);
    return { data: practicalCasesDeleted };
  }

}
