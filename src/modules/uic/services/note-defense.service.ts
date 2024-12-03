import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NoteDefenseEntity } from '../entities/note-defense.entity';
import {
  CreateNoteDefenseDto,
  FilterNoteDefenseDto,
  ReadNoteDefenseDto,
  UpdateNoteDefenseDto,
} from '@uic/dto';

@Injectable()
export class NoteDefensesService {
  constructor(
    @Inject(RepositoryEnum.NOTE_DEFENSE_REPOSITORY)
    private noteDefenseRepository: Repository<NoteDefenseEntity>,
  ) {}

  async create(
    payload: CreateNoteDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    const newNoteDefense = this.noteDefenseRepository.create(payload);
    const noteDefenseCreated = await this.noteDefenseRepository.save(
      newNoteDefense,
    );

    return {
      data: plainToInstance(ReadNoteDefenseDto, noteDefenseCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.noteDefenseRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterNoteDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.noteDefenseRepository.findAndCount({
      relations: { nameStudent: true, },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadNoteDefenseDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.noteDefenseRepository.findOne({
      where: { id },
      relations: { nameStudent: true,  },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadNoteDefenseDto, format) };
  }

  async update(
    id: string,
    payload: UpdateNoteDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    const dowloadFormat = await this.noteDefenseRepository.preload({
      id,
      ...payload,
    });

    if (!dowloadFormat) {
      throw new NotFoundException('Format not found');
    }
    const noteDefenseUpdated = await this.noteDefenseRepository.save(
      dowloadFormat,
    );

    return {
      data: plainToInstance(ReadNoteDefenseDto, noteDefenseUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.noteDefenseRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.noteDefenseRepository.softRemove(format);

    return { data: plainToInstance(ReadNoteDefenseDto, formatDeleted) };
  }

  async removeAll(
    payload: NoteDefenseEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.noteDefenseRepository.softRemove(payload);
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterNoteDefenseDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<NoteDefenseEntity>
      | FindOptionsWhere<NoteDefenseEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.noteDefenseRepository.findAndCount({
      where,
      relations: { nameStudent: true, },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadNoteDefenseDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  filesBuffer(file: string) {
    const filename = file;
    return readFileSync(join(process.cwd(), filename));
  }
}
