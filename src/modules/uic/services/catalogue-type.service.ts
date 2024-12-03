import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateCatalogueTypeDto,
  FilterCatalogueTypeDto,
  ReadCatalogueTypeDto,
  UpdateCatalogueTypeDto,
} from '@uic/dto';
import { CatalogueTypeEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class CatalogueTypeService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_TYPE_REPOSITORY)
    private repository: Repository<CatalogueTypeEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    const newCatalogueType = this.repository.create(payload);
    const catalogueTypeCreated = await this.repository.save(newCatalogueType);

    return { data: plainToInstance(ReadCatalogueTypeDto, catalogueTypeCreated) };
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
    params?: FilterCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {

      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadCatalogueTypeDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }




  private async paginateAndFilter(
    params: FilterCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CatalogueTypeEntity>
      | FindOptionsWhere<CatalogueTypeEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {

      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadCatalogueTypeDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }




  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const catalogueType = await this.repository.findOne({
      where: { id },
      relations: {
        
      },
    });

    if (!catalogueType) {
      throw new NotFoundException('catalogueType not found');
    }

    return { data: plainToInstance(ReadCatalogueTypeDto, catalogueType) };
  }

  async update(
    id: string,
    payload: UpdateCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    const catalogueType = await this.repository.preload({ id, ...payload });

    if (!catalogueType) {
      throw new NotFoundException('CatalogueType not found');
    }

    const catalogueTypeUpdated = await this.repository.save(catalogueType);

    return { data: plainToInstance(ReadCatalogueTypeDto, catalogueTypeUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const catalogueType = await this.repository.findOneBy({ id });

    if (!catalogueType) {
      throw new NotFoundException('CatalogueType not found');
    }

    const catalogueTypeDeleted = await this.repository.softRemove(catalogueType);

    return { data: plainToInstance(ReadCatalogueTypeDto, catalogueTypeDeleted) };
  }

  async removeAll(
    payload: CatalogueTypeEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const catalogueTypesDeleted = await this.repository.softRemove(payload);
    return { data: catalogueTypesDeleted };
  }


}
