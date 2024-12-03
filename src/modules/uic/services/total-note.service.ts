import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { TotalNoteEntity } from '@uic/entities';
import {
  CreateTotalNoteDto,
  FilterTotalNoteDto,
  ReadTotalNoteDto,
  UpdateTotalNoteDto,
} from '@uic/dto';

@Injectable()
export class TotalNotesService {
  constructor(
    @Inject(RepositoryEnum.TOTAL_NOTE_REPOSITORY)
    private totalNoteRepository: Repository<TotalNoteEntity>,
  ) {}

  async create(payload: CreateTotalNoteDto): Promise<ServiceResponseHttpModel> {
    const newTotalNote = this.totalNoteRepository.create(payload);
    const totalNoteCreated = await this.totalNoteRepository.save(newTotalNote);

    return { data: plainToInstance(ReadTotalNoteDto, totalNoteCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.totalNoteRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterTotalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.totalNoteRepository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadTotalNoteDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const totalNote = await this.totalNoteRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!totalNote) {
      throw new NotFoundException('Notes not found');
    }
    return { data: plainToInstance(ReadTotalNoteDto, totalNote) };
  }

  async update(
    id: string,
    payload: UpdateTotalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    const totalNote = await this.totalNoteRepository.preload({
      id,
      ...payload,
    });

    if (!totalNote) {
      throw new NotFoundException('Notes Weight not found');
    }
    const totalNoteUpdated = await this.totalNoteRepository.save(totalNote);

    return { data: plainToInstance(ReadTotalNoteDto, totalNoteUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const totalNote = await this.totalNoteRepository.findOneBy({ id });

    if (!totalNote) {
      throw new NotFoundException('Notes Weight not found');
    }
    const totalNoteDeleted = await this.totalNoteRepository.softRemove(
      totalNote,
    );

    return { data: plainToInstance(ReadTotalNoteDto, totalNoteDeleted) };
  }

  async removeAll(
    payload: TotalNoteEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const totalNotesDeleted = await this.totalNoteRepository.softRemove(
      payload,
    );
    return { data: totalNotesDeleted };
  }

  private async paginateAndFilter(
    params: FilterTotalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TotalNoteEntity>
      | FindOptionsWhere<TotalNoteEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ title: ILike(`%${search}%`) });
    }

    const response = await this.totalNoteRepository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadTotalNoteDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
