import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateTheoricalNoteDto,
  ReadTheoricalNoteDto,
  UpdateTheoricalNoteDto,
  FilterTheoricalNoteDto,
} from '@uic/dto';
import { EnrollmentEntity, TheoricalNoteEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { id } from 'date-fns/locale';
import { UpdateEnrollmentDto } from '../dto/enrollments/update-enrollment.dto';

@Injectable()
export class TheoricalNotesService {
  constructor(
    @Inject(RepositoryEnum.THEORICAL_NOTE_REPOSITORY)
    private repository: Repository<TheoricalNoteEntity>,
    @Inject(RepositoryEnum.ENROLLMENT_REPOSITORY)
    private enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  async create(
    payload: CreateTheoricalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    const id = payload.name.id;
    const state: UpdateEnrollmentDto = { stateM: true };
    const enrollment = await this.enrollmentRepository.preload({
      id,
      ...state,
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.enrollmentRepository.save(enrollment);
    const newTheoricalNote = this.repository.create(payload);
    const theoricalNotesCreated = await this.repository.save(newTheoricalNote);

    return {
      data: plainToInstance(ReadTheoricalNoteDto, theoricalNotesCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 40 },
    };
  }

  async getTheoricalNotesForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterTheoricalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: { name: { student: { user: true, career: true } } },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadTheoricalNoteDto, response[0]),
      pagination: { totalItems: response[1], limit: 40 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const theoricalNotes = await this.repository.findOne({
      where: { id },
      relations: { name: { student: true } },
    });

    if (!theoricalNotes) {
      throw new NotFoundException('TheoricalNote not found');
    }
    return {
      data: plainToInstance(ReadTheoricalNoteDto, theoricalNotes),
    };
  }

  async update(
    id: string,
    payload: UpdateTheoricalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    const theoricalNotes = await this.repository.preload({
      id,
      ...payload,
    });

    if (!theoricalNotes) {
      throw new NotFoundException('TheoricalNote not found');
    }
    const theoricalNotesUpdated = await this.repository.save(theoricalNotes);

    return {
      data: plainToInstance(ReadTheoricalNoteDto, theoricalNotesUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const theoricalNotes = await this.repository.findOneBy({ id });

    if (!theoricalNotes) {
      throw new NotFoundException('TheoricalNote not found');
    }
    const theoricalNotessDelete = await this.repository.softRemove(
      theoricalNotes,
    );

    return {
      data: plainToInstance(ReadTheoricalNoteDto, theoricalNotessDelete),
    };
  }

  async removeAll(
    payload: TheoricalNoteEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const theoricalNotessDeleted = await this.repository.softRemove(payload);
    return { data: theoricalNotessDeleted };
  }

  private async paginateAndFilter(
    params: FilterTheoricalNoteDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TheoricalNoteEntity>
      | FindOptionsWhere<TheoricalNoteEntity>[];
    where = {};
    let { page, search } = params;
    const { limit, userId } = params;
    console.log(userId);

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: { student: { user: { id: userId } } } });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: { name: { student: { user: true, career: true } } },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadTheoricalNoteDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
