import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateUploadRequirementRequestDto,
  ReadUploadRequirementRequestDto,
  FilterUploadRequirementRequestDto,
  UpdateUploadRequirementRequestDto,
} from '@uic/dto';
import { UploadRequirementRequestEntity } from '@uic/entities';
import { Repository, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { BaseUploadProjectDto } from '../dto/upload-projects/base-upload-project.dto';

@Injectable()
export class UploadRequirementRequestsService {
  constructor(
    @Inject(RepositoryEnum.UPLOAD_REQUIREMENT_REQUEST_REPOSITORY)
    private repository: Repository<UploadRequirementRequestEntity>,
  ) {}

  async create(
    payload: CreateUploadRequirementRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    const newUploadRequirementRequest = this.repository.create(payload);
    const uploadRequirementRequestCreated = await this.repository.save(
      newUploadRequirementRequest,
    );

    return {
      data: plainToInstance(
        ReadUploadRequirementRequestDto,
        uploadRequirementRequestCreated,
      ),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getUploadRequirementRequestsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(
    params?: FilterUploadRequirementRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        planning: true,
        //name: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadUploadRequirementRequestDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findOne(id: string): Promise<ServiceResponseHttpModel> {
  //   const requirementRequest = await this.repository.findOneBy({ id });
  //   if (!requirementRequest) {
  //     throw new NotFoundException('RequirementRequest not found');
  //   }
  //   return { data: plainToInstance(ReadRequirementRequestDto, requirementRequest) };
  // }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const uploadrequirementRequest = await this.repository.findOne({
      where: { id },
      relations: {
        planning: true,
      },
    });

    if (!uploadrequirementRequest) {
      throw new NotFoundException('Upload not found');
    }
    return {
      data: plainToInstance(
        ReadUploadRequirementRequestDto,
        uploadrequirementRequest,
      ),
    };
  }

  async update(
    id: string,
    payload: UpdateUploadRequirementRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    const uploadRequirementRequest = await this.repository.preload({
      id,
      ...payload,
    });

    if (!uploadRequirementRequest) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const uploadRequirementRequestUpdated = await this.repository.save(
      uploadRequirementRequest,
    );

    return {
      data: plainToInstance(
        ReadUploadRequirementRequestDto,
        uploadRequirementRequestUpdated,
      ),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const uploadRequirementRequest = await this.repository.findOneBy({ id });

    if (!uploadRequirementRequest) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const uploadRequirementRequestDelete = await this.repository.softRemove(
      uploadRequirementRequest,
    );

    return {
      data: plainToInstance(
        ReadUploadRequirementRequestDto,
        uploadRequirementRequestDelete,
      ),
    };
  }

  async removeAll(
    payload: UploadRequirementRequestEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const uploadRequirementRequestsDeleted = await this.repository.softRemove(
      payload,
    );
    return { data: uploadRequirementRequestsDeleted };
  }

  private async paginateAndFilter(
    params: FilterUploadRequirementRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<UploadRequirementRequestEntity>
      | FindOptionsWhere<UploadRequirementRequestEntity>[];
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
        planning: true,
        //name: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadUploadRequirementRequestDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  async upload(file: any): Promise<ServiceResponseHttpModel> {
    // const requirementFormat = await this.repository.preload({ id, ...payload });

    // if (!requirementFormat) {
    //   throw new NotFoundException('RequirementFormat not found');
    // }
    // const requirementFormatUpdated = await this.repository.save(requirementFormat);

    // No copies el service hasta que este ekiminado este comentario
    return {
      data: plainToInstance(
        ReadUploadRequirementRequestDto,
        new UploadRequirementRequestEntity(),
      ),
    };
  }

  // async uploadFile(filename: BaseUploadProjectDto) {
  //   const file = new this.create(filename);
  //   return await file.save();
  // }
}
