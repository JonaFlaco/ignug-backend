import { CatalogueEntity } from '@uic/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '@core/dto';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike} from 'typeorm';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { 
  CreateApprovalRequestDto,
  CreateCatalogueDto,
  FilterCatalogueDto,
  ReadApprovalRequestDto,
  ReadCatalogueDto, 
} from '@uic/dto';
import { ApprovalRequestEntity } from '../entities/approval-request.entity';

@Injectable()
export class ApprovalRequestsService {
  constructor(
    @Inject(RepositoryEnum.APPROVAL_REQUEST_UIC_REPOSITORY)
    private repository: Repository<CatalogueEntity>,
  ) {}

  async create(payload: CreateApprovalRequestDto): Promise<ServiceResponseHttpModel> {
    const newApprovalRequestUic= this.repository.create(payload);
    const approvalRequestUicCreated = await this.repository.save(newApprovalRequestUic);

    return { data: plainToInstance(ReadApprovalRequestDto,approvalRequestUicCreated) };
  }

  private async paginateAndFilter(
    params: FilterCatalogueDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<ApprovalRequestEntity> | FindOptionsWhere<ApprovalRequestEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadApprovalRequestDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}