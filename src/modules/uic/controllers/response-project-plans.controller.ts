import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators';
import { ResponseHttpModel } from '@shared/models';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseProjectPlansService } from '../services/response-project-plan.service';
import { BaseResponseProjectPlanDto } from '../dto/response-project-plans/base-response-project-plan.dto';

@ApiTags('ResponseProjectPlans')
@Controller('responseProjectPlans')
export class ResponseProjectPlansController {
  constructor(
    private responseProjectPlansService: ResponseProjectPlansService,
  ) {}

  @ApiOperation({ summary: 'Send response' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: BaseResponseProjectPlanDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.responseProjectPlansService.save(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Respuesta Enviada',
      title: 'Enviado',
    };
  }
}
