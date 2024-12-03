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
  CreateComplexTimelineDto,
  FilterComplexTimelineDto,
  UpdateComplexTimelineDto,
} from '@uic/dto';
import { ComplexTimelineEntity } from '@uic/entities';
import { ComplexTimelinesService } from '@uic/services';

@ApiTags('Complex-Timelines')
@Controller('complex-timelines')
export class ComplexTimelinesController {
  constructor(private complexTimelineService: ComplexTimelinesService) {}

  @ApiOperation({ summary: 'Creado uno' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateComplexTimelineDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexTimelineService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'datos Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexTimelineService.catalogue();

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
    @Query() params: FilterComplexTimelineDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexTimelineService.findAll(params);

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
    const serviceResponse = await this.complexTimelineService.findOne(id);

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
    @Body() payload: UpdateComplexTimelineDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexTimelineService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Datos Actualizados ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Eliminado' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexTimelineService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Dato Eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar todos' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ComplexTimelineEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexTimelineService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Datos Eliminados`,
      title: `Eliminados`,
    };
  }
}
//comentario