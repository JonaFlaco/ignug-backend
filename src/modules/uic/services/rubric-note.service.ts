import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';

import { RubricEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { id } from 'date-fns/locale';
import { UpdateEnrollmentDto } from '../dto/enrollments/update-enrollment.dto';
import { RubricNoteEntity } from '../entities/rubric-note.entity';
import { CreateRubricNoteDto } from '../dto/rubric-notes/create-rubric-note.dto';
import { FilterRubricNoteDto } from '../dto/rubric-notes/filter-rubric-note.dto';
import { UpdateRubricNoteDto } from '../dto/rubric-notes/update-rubric-note.dto';
import { ReadRubricNoteDto } from '../dto/rubric-notes/read-rubric-note.dto';

@Injectable()
export class RubricNotesService {
  constructor(
    @Inject(RepositoryEnum.RUBRIC_NOTE_REPOSITORY)
    private repository: Repository<RubricNoteEntity>,
    @Inject(RepositoryEnum.RUBRIC_REPOSITORY)
    private rubricRepository: Repository<RubricEntity>,
  ) {}

  async create(
    payload: CreateRubricNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    const id = payload.rubric.id;
    const state: UpdateEnrollmentDto = { stateM: true };
    const rubric = await this.rubricRepository.preload({
      id,
      ...state,
    });

    if (!rubric) {
      throw new NotFoundException('Rubric not found');
    }

    await this.rubricRepository.save(rubric);
    const newrubricNote = this.repository.create(payload);
    const rubricNotesCreated = await this.repository.save(newrubricNote);

    return {
      data: plainToInstance(ReadRubricNoteDto, rubricNotesCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 40 },
    };
  }

  async getRubricNotesForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterRubricNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: { rubric: true, teacher: { career: true }, student: {user:true}},
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadRubricNoteDto, response[0]),
      pagination: { totalItems: response[1], limit: 40 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const rubricNotes = await this.repository.findOne({
      where: { id },
      relations: { rubric: true, teacher: { career: true }, student: {user:true} },
    });

    if (!rubricNotes) {
      throw new NotFoundException('RubricNote not found');
    }
    return {
      data: plainToInstance(ReadRubricNoteDto, rubricNotes),
    };
  }

  async update(
    id: string,
    payload: UpdateRubricNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    const rubricNotes = await this.repository.preload({
      id,
      ...payload,
    });

    if (!rubricNotes) {
      throw new NotFoundException('RubricNote not found');
    }
    const rubricNotesUpdated = await this.repository.save(rubricNotes);

    return {
      data: plainToInstance(ReadRubricNoteDto, rubricNotesUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const rubricNotes = await this.repository.findOneBy({ id });

    if (!rubricNotes) {
      throw new NotFoundException('RubricNote not found');
    }
    const rubricNotessDelete = await this.repository.softRemove(rubricNotes);

    return {
      data: plainToInstance(ReadRubricNoteDto, rubricNotessDelete),
    };
  }

  async removeAll(
    payload: RubricNoteEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const rubricNotessDeleted = await this.repository.softRemove(payload);
    return { data: rubricNotessDeleted };
  }

  private async paginateAndFilter(
    params: FilterRubricNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RubricNoteEntity>
      | FindOptionsWhere<RubricNoteEntity>[];
    where = {};
    let { page, search } = params;
    const { limit, userId } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ student: { user: { id: userId } } });
      where.push({ rubric: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: { rubric: true, teacher: { career: true }, student: {user:true}},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadRubricNoteDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
