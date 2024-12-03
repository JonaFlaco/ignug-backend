import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { ResponseHttpModel } from '@shared/models';
  import { EventsService } from '@uic/services';
import { CreateFormatProyectPlanDto } from '../dto/format-proyect-plans/create-format-proyect-plan.dto';
import { FormatProyectPlansService } from '../services/format-proyect-plan.service';

  @ApiTags('Approval-requests')
@Controller('approval-requests')
export class ApprovalRequestsController {
  constructor(private formatProyectPlansService: FormatProyectPlansService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateFormatProyectPlanDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.formatProyectPlansService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Event created',
      title: 'Created',
    };
  }
 }