import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateSignatureDto,
  FilterSignatureDto,
  ReadSignatureDto,
  UpdateSignatureDto,
} from '@uic/dto';

import { PaginationDto } from '@core/dto';
import { SignatureEntity } from '@uic/entities';

@Injectable()
export class SignaturesService {
  constructor(
    @Inject(RepositoryEnum.SIGNATURE_REPOSITORY)
    private repository: Repository<SignatureEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateSignatureDto): Promise<ServiceResponseHttpModel> {
    const newSignature = this.repository.create(payload);
    const signatureCreated = await this.repository.save(newSignature);

    return { data: plainToInstance(ReadSignatureDto, signatureCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterSignatureDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

  
    //All
    const response = await this.repository.findAndCount({
      relations: {
        tutor: true,
        signature: true,
        preparationCourse: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadSignatureDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findByPreparationCourse(
    preparationCourseId: string,
    params?: FilterSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      where: [{ preparationCourse: { id: preparationCourseId } }],
      relations: {
        preparationCourse: true,
        tutor:true,
        signature:true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadSignatureDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findByPreparationCourseTimeline(
    preparationCourseId: string,
    params?: FilterSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      where: [{ preparationCourse: { id: preparationCourseId } }],
      relations: {
        preparationCourse: true,
        signature:true,
      },
      order: { updatedAt: 'DESC' },
    });
    return {
      data: plainToInstance(ReadSignatureDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }



  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.findOne({
      where: { id },
      relations: {
        tutor: true,
        signature: true,
        preparationCourse: true,
      },
    });

    if (!signature) {
      throw new NotFoundException('signature not found');
    }

    return { data: plainToInstance(ReadSignatureDto, signature) };
  }

  async update(
    id: string,
    payload: UpdateSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.preload({ id, ...payload });

    if (!signature) {
      throw new NotFoundException('Signature not found');
    }

    const signatureUpdated = await this.repository.save(signature);

    return { data: plainToInstance(ReadSignatureDto, signatureUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.findOneBy({ id });

    if (!signature) {
      throw new NotFoundException('Signature not found');
    }

    const signatureDeleted = await this.repository.softRemove(signature);

    return { data: plainToInstance(ReadSignatureDto, signatureDeleted) };
  }

  async removeAll(payload: SignatureEntity[]): Promise<ServiceResponseHttpModel> {
    const signaturesDeleted = await this.repository.softRemove(payload);
    return { data: signaturesDeleted };
  }

  private async paginateAndFilter(
    params: FilterSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<SignatureEntity> | FindOptionsWhere<SignatureEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ signature: {name:ILike(`%${search}%`)} });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {
        tutor: true,
        signature: true,
        preparationCourse: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadSignatureDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

}
