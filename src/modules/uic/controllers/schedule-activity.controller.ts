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
  CreateScheduleActivityDto,
  FilterScheduleActivityDto,
  UpdateScheduleActivityDto,
} from '@uic/dto';
import { ScheduleActivityEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { ScheduleActivitiesService } from '@uic/services';

@ApiTags('schedule-activities')
@Controller('schedule-activities')
export class ScheduleActivitiesController {
  constructor(private scheduleActivitiesService: ScheduleActivitiesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateScheduleActivityDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.scheduleActivitiesService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Actividad creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.scheduleActivitiesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterScheduleActivityDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.scheduleActivitiesService.findAll(
      params,
    );

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
    const serviceResponse = await this.scheduleActivitiesService.findOne(id);

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
    @Body() payload: UpdateScheduleActivityDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.scheduleActivitiesService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Actividad Actualizada `,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.scheduleActivitiesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Banco del proyecto Borrado `,
      title: `Borrado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ScheduleActivityEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.scheduleActivitiesService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Actividades Borradas`,
      title: `Borrado`,
    };
  }
}
