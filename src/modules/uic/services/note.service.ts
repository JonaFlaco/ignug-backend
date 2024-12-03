import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateNoteDto,
  FilterNoteDto,
  ReadNoteDto,
  UpdateNoteDto,
} from '@uic/dto';
import { NoteEntity, TribunalEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class NotesService {
  constructor(
    @Inject(RepositoryEnum.NOTE_REPOSITORY)
    private repository: Repository<NoteEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateNoteDto): Promise<ServiceResponseHttpModel> {
    const newNote = this.repository.create(payload);
    const noteCreated = await this.repository.save(newNote);

    return { data: plainToInstance(ReadNoteDto, noteCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterNoteDto): Promise<ServiceResponseHttpModel> {
  
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
   
    const response = await this.repository.findAndCount({
      relations: {
        studentInformation: true,
        projectBench: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadNoteDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const note = await this.repository.findOne({
      where: { id },
      relations: {
        studentInformation: true,
        projectBench: true,
      },
    });

    if (!note) {
      throw new NotFoundException('note not found');
    }

    return { data: plainToInstance(ReadNoteDto, note) };
  }

  async update(
    id: string,
    payload: UpdateNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    const note = await this.repository.preload({ id, ...payload });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const noteUpdated = await this.repository.save(note);

    return { data: plainToInstance(ReadNoteDto, noteUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const note = await this.repository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const noteDeleted = await this.repository.softRemove(note);

    return { data: plainToInstance(ReadNoteDto, noteDeleted) };
  }

  async removeAll(
    payload: NoteEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const notesDeleted = await this.repository.softRemove(payload);
    return { data: notesDeleted };
  }

  private async paginateAndFilter(
    params: FilterNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<NoteEntity>
      | FindOptionsWhere<NoteEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {
        studentInformation: true,
        projectBench: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadNoteDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
