import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '@core/dto';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike} from 'typeorm';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { 
  CreateFormatProyectPlanDto,
  ReadFormatProyectPlanDto, 
} from '@uic/dto';
import { FormatProyectPlanEntity } from '../entities/format-proyect-plan.entity';

@Injectable()
export class FormatProyectPlansService {
  constructor(
    @Inject(RepositoryEnum.FORMAT_PROYECT_PLAN_UIC_REPOSITORY)
    private repository: Repository<FormatProyectPlanEntity>,
  ) {}

  async create(payload: CreateFormatProyectPlanDto): Promise<ServiceResponseHttpModel> {
    const newFormatProyectPlan= this.repository.create(payload);
    const formatProyectPlanCreated = await this.repository.save(newFormatProyectPlan);

    return { data: plainToInstance(ReadFormatProyectPlanDto,formatProyectPlanCreated) };
  }
  }