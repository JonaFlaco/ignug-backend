import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UploadScoreEntity } from '@uic/entities';
import { CreateUploadScoreDto, FilterUploadScoreDto, ReadUploadScoreDto, UpdateUploadScoreDto } from '@uic/dto';



@Injectable()
export class UploadScoresService {
  constructor(
    @Inject(RepositoryEnum.UPLOAD_SCORE_REPOSITORY)
    private uploadScoreRepository: Repository<UploadScoreEntity>,
  ) {}

  async create(payload: CreateUploadScoreDto): Promise<ServiceResponseHttpModel> {
    const newDownloadFormat= this.uploadScoreRepository.create(payload);
    const uploadScoreCreated = await this.uploadScoreRepository.save(newDownloadFormat);

    return { data: plainToInstance(ReadUploadScoreDto, uploadScoreCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.uploadScoreRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterUploadScoreDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.uploadScoreRepository.findAndCount({
      relations: {
        nameCareer:true
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadUploadScoreDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const format= await this.uploadScoreRepository.findOne({
      where: { id },
      relations: {
        nameCareer:true
      },
    });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    return { data: plainToInstance(ReadUploadScoreDto, format) };
  }

  async update(
    id: string,
    payload: UpdateUploadScoreDto,
  ): Promise<ServiceResponseHttpModel> {
    const uploadScore = await this.uploadScoreRepository.preload({ id, ...payload });

    if (!uploadScore) {
      throw new NotFoundException('Format not found');
    }
    const uploadScoreUpdated = await this.uploadScoreRepository.save(uploadScore);

    return { data: plainToInstance(ReadUploadScoreDto, uploadScoreUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const format = await this.uploadScoreRepository.findOneBy({ id });

    if (!format) {
      throw new NotFoundException('Format not found');
    }
    const formatDeleted = await this.uploadScoreRepository.softRemove(format);

    return { data: plainToInstance(ReadUploadScoreDto, formatDeleted) };
  }

  async removeAll(payload: UploadScoreEntity[]): Promise<ServiceResponseHttpModel> {
    const formatsDeleted = await this.uploadScoreRepository.softRemove(payload);
    return { data: formatsDeleted };
  }

  private async paginateAndFilter(
    params: FilterUploadScoreDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<UploadScoreEntity>
      | FindOptionsWhere<UploadScoreEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.uploadScoreRepository.findAndCount({
      where,
      relations: {
        nameCareer:true
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadUploadScoreDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  filesBuffer(file :string) {
    const filename = file;
    return readFileSync(join(process.cwd(), filename));
  }


}
