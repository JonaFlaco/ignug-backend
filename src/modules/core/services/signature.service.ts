import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateSignatureDto,
  FilterSignatureDto,
  ReadSignatureDto,
  UpdateSignatureDto,
} from '@core/dto';
import { SignatureCatEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class SignatureService {
  constructor(
    @Inject(RepositoryEnum.CORE_SIGNATURE_REPOSITORY)
    private repository: Repository<SignatureCatEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    const newSignature = this.repository.create(payload);
    const signatureCreated = await this.repository.save(newSignature);

    return { data: plainToInstance(ReadSignatureDto, signatureCreated) };
  }


  // catalogo
  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
 
  async findAll(
    params?: FilterSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {

      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadSignatureDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }




  private async paginateAndFilter(
    params: FilterSignatureDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SignatureCatEntity>
      | FindOptionsWhere<SignatureCatEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {

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




  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const signature = await this.repository.findOne({
      where: { id },
      relations: {
       
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

  async removeAll(
    payload: SignatureCatEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const signaturesDeleted = await this.repository.softRemove(payload);
    return { data: signaturesDeleted };
  }


}
