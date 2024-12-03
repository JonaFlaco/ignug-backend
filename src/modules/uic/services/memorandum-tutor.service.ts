import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { MemorandumTutorEntity } from '@uic/entities';
import {
  CreateMemorandumTutorDto,
  FilterMemorandumTutorDto,
  ReadMemorandumTutorDto,
  UpdateMemorandumTutorDto,
} from '@uic/dto';

@Injectable()
export class MemorandumTutorsService {
  constructor(
    @Inject(RepositoryEnum.MEMORANDUM_TUTOR_REPOSITORY)
    private memorandumTutorRepository: Repository<MemorandumTutorEntity>,
  ) {}

  async create(
    payload: CreateMemorandumTutorDto,
  ): Promise<ServiceResponseHttpModel> {
    const newMemorandumTutor = this.memorandumTutorRepository.create(payload);
    const memorandumTutorCreated = await this.memorandumTutorRepository.save(
      newMemorandumTutor,
    );

    return {
      data: plainToInstance(ReadMemorandumTutorDto, memorandumTutorCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.memorandumTutorRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterMemorandumTutorDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.memorandumTutorRepository.findAndCount({
      relations: {
        nameStudent: true,
        nameTeacher: true,
        topic: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadMemorandumTutorDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const memorandumTutor = await this.memorandumTutorRepository.findOne({
      where: { id },
      relations: {
        nameStudent: true,
        nameTeacher: true,
        topic: true,
      },
    });

    if (!memorandumTutor) {
      throw new NotFoundException('memorandumTutor not found');
    }
    return { data: plainToInstance(ReadMemorandumTutorDto, memorandumTutor) };
  }

  async update(
    id: string,
    payload: UpdateMemorandumTutorDto,
  ): Promise<ServiceResponseHttpModel> {
    const memorandumTutor = await this.memorandumTutorRepository.preload({
      id,
      ...payload,
    });

    if (!memorandumTutor) {
      throw new NotFoundException('memorandumTutor not found');
    }
    const memorandumTutorUpdated = await this.memorandumTutorRepository.save(
      memorandumTutor,
    );

    return {
      data: plainToInstance(ReadMemorandumTutorDto, memorandumTutorUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const memorandumTutor = await this.memorandumTutorRepository.findOneBy({
      id,
    });

    if (!memorandumTutor) {
      throw new NotFoundException('memorandumTutor not found');
    }
    const memorandumTutorDeleted =
      await this.memorandumTutorRepository.softRemove(memorandumTutor);

    return {
      data: plainToInstance(ReadMemorandumTutorDto, memorandumTutorDeleted),
    };
  }

  async removeAll(
    payload: MemorandumTutorEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const memorandumTutorsDeleted =
      await this.memorandumTutorRepository.softRemove(payload);
    return { data: memorandumTutorsDeleted };
  }

  private async paginateAndFilter(
    params: FilterMemorandumTutorDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<MemorandumTutorEntity>
      | FindOptionsWhere<MemorandumTutorEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ type: ILike(`%${search}%`) });
    }

    const response = await this.memorandumTutorRepository.findAndCount({
      where,
      relations: {
        nameStudent: true,
        nameTeacher: true,
        topic: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadMemorandumTutorDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
