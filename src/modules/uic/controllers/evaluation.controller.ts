import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators';
import {
  CreateEvaluationDto,
  FilterEvaluationDto,
  UpdateEvaluationDto,
} from '@uic/dto';
import { EvaluationEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { EvaluationService } from '@uic/services';

@ApiTags('evaluations')
@Controller('evaluations')
export class EvaluationController {
  constructor(private evaluationService: EvaluationService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateEvaluationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Sus archivos se han enviado correctamente',
      title: 'Archivos Enviados',
    };
  }

  // @ApiOperation({ summary: 'Catalogue' })
  // @Get('catalogue')
  // @HttpCode(HttpStatus.OK)
  // async catalogue(): Promise<ResponseHttpModel> {
  //   const serviceResponse =
  //     await this.uploadRequirementRequestsService.catalogue();

  //   return {
  //     data: serviceResponse.data,
  //     pagination: serviceResponse.pagination,
  //     message: `catalogue`,
  //     title: `Catalogue`,
  //   };
  // }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterEvaluationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateEvaluationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Actualización del envío de archivos de ${id}`,
      title: `Actualizado el envío`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Envío de archivos eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: EvaluationEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Envío Eliminado`,
      title: `Eliminado`,
    };
  }
}
