import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { FormatEntity } from '@uic/entities';
import {
  CreateFormatDto,
  FilterFormatDto,
  UpdateFormatDto,
  ReadFormatDto,
} from '@uic/dto';

@Injectable()
export class FormatsService {
  constructor(
    @Inject(RepositoryEnum.FORMAT_REPOSITORY)
    private formatRepository: Repository<FormatEntity>,
  ) {}

  async create(payload: CreateFormatDto): Promise<ServiceResponseHttpModel> {
    const newFormat = this.formatRepository.create(payload);
    const formatCreated = await this.formatRepository.save(newFormat);

    return { data: plainToInstance(ReadFormatDto, formatCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.formatRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getFormatsSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.formatRepository.find({});
    return {
      data: response,
    };
  }

  async findAll(params?: FilterFormatDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.formatRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadFormatDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.formatRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadFormatDto, format) };
  }

  async update(
    id: string,
    payload: UpdateFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    const format = await this.formatRepository.preload({ id, ...payload });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatUpdated = await this.formatRepository.save(format);

    return { data: plainToInstance(ReadFormatDto, formatUpdated) };
  }

  async upload(file: any): Promise<ServiceResponseHttpModel> {
    // const requirementFormat = await this.repository.preload({ id, ...payload });

    // if (!requirementFormat) {
    //   throw new NotFoundException('RequirementFormat not found');
    // }
    // const requirementFormatUpdated = await this.repository.save(requirementFormat);

    // No copies el service hasta que este ekiminado este comentario
    return { data: plainToInstance(ReadFormatDto, new FormatEntity()) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.formatRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.formatRepository.softRemove(format);

    return { data: plainToInstance(ReadFormatDto, formatDeleted) };
  }

  async removeAll(payload: FormatEntity[]): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.formatRepository.softRemove(payload);
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterFormatDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<FormatEntity>
      | FindOptionsWhere<FormatEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.formatRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadFormatDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
