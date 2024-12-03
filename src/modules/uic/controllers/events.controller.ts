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
import { CreateEventDto, FilterEventDto, UpdateEventDto } from '@uic/dto';
import { EventEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { EventsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEventDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Su Evento ha sido creado correctamente',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.catalogue();

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
  async findAll(@Query() params: FilterEventDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find by planning' })
  @Get('plannings/:id')
  @HttpCode(HttpStatus.OK)
  async findByPlanning(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() params: FilterEventDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.findByPlanning(id, params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `eventsByplanning`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find by planning TimeLine' })
  @Get('timeline/:id')
  @HttpCode(HttpStatus.OK)
  async findByPlanninTimeline(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() params: FilterEventDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.findByPlanningTimeline(
      id,
      params,
    );

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `eventsByplanning`,
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
    const serviceResponse = await this.eventsService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `mirar ${id}`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateEventDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Evento ha sido actualizado correctamente`,
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
    const serviceResponse = await this.eventsService.remove(id);

    return {
      data: serviceResponse.data,
      message: ` Evento ha sido eliminado `,
      title: `Evento Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: EventEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: ` Eventos han sido eliminados `,
      title: `Eventos Eliminados`,
    };
  }
}
