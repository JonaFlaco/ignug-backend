import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RepositoryEnum } from '@shared/enums';
import { BaseResponseProjectPlanDto } from '../dto/response-project-plans/base-response-project-plan.dto';
import { ProjectPlansService } from './project-plans.service';
import { ProjectPlanEntity } from '../entities/project-plan.entity';
import { ResponseProjectPlanEntity } from '../entities/response-project-plan.entity';
import { plainToInstance } from 'class-transformer';
import { ReadResponseProjectPlanDto } from '../dto/response-project-plans/read-response-project-plan.dto';

@Injectable()
export class ResponseProjectPlansService {
  @Inject(ProjectPlansService)
  private readonly proyectPlanService: ProjectPlansService;
  constructor(
    @Inject(RepositoryEnum.RESPONSE_PROJECT_PLAN_REPOSITORY)
    private repository: Repository<ResponseProjectPlanEntity>,
  ) {}

  async save(dto: BaseResponseProjectPlanDto) {
    const proyectPlan: ProjectPlanEntity =
      await this.proyectPlanService.updateEntity(dto.idProyectPlan, {
        observation: dto.observation,
        tutor: dto.tutor,
        state: dto.state,
        answeredAt: new Date(),
      });
    const newResponseProjectPlan = this.repository.create({
      observation: dto.observation,
      tutor: dto.tutor,
      state: dto.state,
      proyectPlan: proyectPlan,
    });
    const responseProjectPlanCreated = await this.repository.save(
      newResponseProjectPlan,
    );
    return {
      data: plainToInstance(
        ReadResponseProjectPlanDto,
        responseProjectPlanCreated,
      ),
    };
  }
}
