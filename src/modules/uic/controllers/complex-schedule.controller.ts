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
import { ResponseHttpModel } from '@shared/models';
import {
  CreateComplexScheduleDto,
  FilterComplexScheduleDto,
  UpdateComplexScheduleDto,
} from '@uic/dto';
import { ComplexScheduleEntity } from '@uic/entities';
import { ComplexSchedulesService } from '@uic/services';

@ApiTags('Complex-Schedules')
@Controller('complex-schedules')
export class ComplexSchedulesController {
  constructor(private complexScheduleService: ComplexSchedulesService) {}

  @ApiOperation({ summary: 'Creado uno' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateComplexScheduleDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Actividad Creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `catalogue`,
    };
  }

  @ApiOperation({ summary: 'Encontrar todos' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterComplexScheduleDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Encontrar uno' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Actualizado' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateComplexScheduleDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Actividad Actualizados`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Eliminado' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Actividad Eliminada`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar todos' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ComplexScheduleEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexScheduleService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Actividades Eliminadas`,
      title: `Eliminados`,
    };
  }
}
