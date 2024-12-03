import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CreateNoteSettingDto, FilterNoteSettingDto, ReadNoteSettingDto, UpdateNoteSettingDto } from '@uic/dto';
import { NoteSettingEntity } from '@uic/entities';

@Injectable()
export class NoteSettingsService {
  constructor(
    @Inject(RepositoryEnum.NOTE_SETTING_REPOSITORY)
    private noteSettingRepository: Repository<NoteSettingEntity>,
  ) {}

  async create(
    payload: CreateNoteSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    const newNoteSetting = this.noteSettingRepository.create(payload);
    const noteSettingCreated = await this.noteSettingRepository.save(
      newNoteSetting,
    );

    return {
      data: plainToInstance(ReadNoteSettingDto, noteSettingCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.noteSettingRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterNoteSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.noteSettingRepository.findAndCount({
      relations: {student:{note:true}},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadNoteSettingDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.noteSettingRepository.findOne({
      where: { id },
      relations: {student:true},
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadNoteSettingDto, format) };
  }

  async update(
    id: string,
    payload: UpdateNoteSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    const dowloadFormat = await this.noteSettingRepository.preload({
      id,
      ...payload,
    });

    if (!dowloadFormat) {
      throw new NotFoundException('Format not found');
    }
    const noteSettingUpdated = await this.noteSettingRepository.save(
      dowloadFormat,
    );

    return {
      data: plainToInstance(ReadNoteSettingDto, noteSettingUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.noteSettingRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.noteSettingRepository.softRemove(
      format,
    );

    return { data: plainToInstance(ReadNoteSettingDto, formatDeleted) };
  }

  async removeAll(
    payload: NoteSettingEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.noteSettingRepository.softRemove(
      payload,
    );
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterNoteSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<NoteSettingEntity>
      | FindOptionsWhere<NoteSettingEntity>[]; 
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.noteSettingRepository.findAndCount({
      where,
      relations: {student:{note:true}},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadNoteSettingDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  filesBuffer(file: string) {
    const filename = file;
    return readFileSync(join(process.cwd(), filename));
  }
}
