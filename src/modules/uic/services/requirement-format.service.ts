import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateRequirementFormatDto,
  ReadRequirementFormatDto,
  FilterRequirementFormatDto,
  UpdateRequirementFormatDto,
} from '@uic/dto';
import { RequirementFormatEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class RequirementFormatsService {
  constructor(
    @Inject(RepositoryEnum.REQUIREMENT_FORMAT_REPOSITORY)
    private repository: Repository<RequirementFormatEntity>,
  ) {}

  async create(
    payload: CreateRequirementFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    const newRequirementFormat = this.repository.create(payload);
    const requirementFormatCreated = await this.repository.save(
      newRequirementFormat,
    );

    return {
      data: plainToInstance(ReadRequirementFormatDto, requirementFormatCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getRequirementFormatsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterRequirementFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        nameModality: true,
        nameCareer: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadRequirementFormatDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findOne(id: string): Promise<ServiceResponseHttpModel> {
  //   const requirementFormat = await this.repository.findOneBy({ id });

  //   if (!requirementFormat) {
  //     throw new NotFoundException('RequirementFormat not found');
  //   }
  //   return { data: plainToInstance(ReadRequirementFormatDto, requirementFormat) };
  // }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const requirementFormat = await this.repository.findOne({
      where: { id },
      relations: {
        nameModality: true,
        nameCareer: true,
      },
    });

    if (!requirementFormat) {
      throw new NotFoundException('Planning not found');
    }
    return {
      data: plainToInstance(ReadRequirementFormatDto, requirementFormat),
    };
  }

  async update(
    id: string,
    payload: UpdateRequirementFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    const requirementFormat = await this.repository.preload({ id, ...payload });

    if (!requirementFormat) {
      throw new NotFoundException('RequirementFormat not found');
    }
    const requirementFormatUpdated = await this.repository.save(
      requirementFormat,
    );

    return {
      data: plainToInstance(ReadRequirementFormatDto, requirementFormatUpdated),
    };
  }

  async upload(file: any): Promise<ServiceResponseHttpModel> {
    // const requirementFormat = await this.repository.preload({ id, ...payload });

    // if (!requirementFormat) {
    //   throw new NotFoundException('RequirementFormat not found');
    // }
    // const requirementFormatUpdated = await this.repository.save(requirementFormat);

    // No copies el service hasta que este ekiminado este comentario
    return {
      data: plainToInstance(
        ReadRequirementFormatDto,
        new RequirementFormatEntity(),
      ),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const requirementFormat = await this.repository.findOneBy({ id });

    if (!requirementFormat) {
      throw new NotFoundException('RequirementFormat not found');
    }
    const requirementFormatDelete = await this.repository.softRemove(
      requirementFormat,
    );

    return {
      data: plainToInstance(ReadRequirementFormatDto, requirementFormatDelete),
    };
  }

  async removeAll(
    payload: RequirementFormatEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const requirementFormatsDeleted = await this.repository.softRemove(payload);
    return { data: requirementFormatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRequirementFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RequirementFormatEntity>
      | FindOptionsWhere<RequirementFormatEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nameFormat: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        nameModality: true,
        nameCareer: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadRequirementFormatDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
