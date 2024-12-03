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
//import { Uic } from '@uic/decorators';
import {
  CreateTheoricalNoteDto,
  FilterTheoricalNoteDto,
  UpdateTheoricalNoteDto,
} from '@uic/dto';
import { TheoricalNoteEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { TheoricalNotesService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('theorical-note')
@Controller('theorical-note')
export class TheoricalNotesController {
  constructor(private theoricalNotesService: TheoricalNotesService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateTheoricalNoteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.theoricalNotesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Nota del Examén Teórico Guardada',
      title: 'Guardado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.theoricalNotesService.catalogue();

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
    @Query() params: FilterTheoricalNoteDto,
  ): Promise<ResponseHttpModel> {
    //console.log(params);
    const serviceResponse = await this.theoricalNotesService.findAll(params);
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
    const serviceResponse = await this.theoricalNotesService.findOne(id);

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
    @Body() payload: UpdateTheoricalNoteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.theoricalNotesService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `La nota fue actualizada`,
      title: `Actualizada`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.theoricalNotesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Nota eliminada`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: TheoricalNoteEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.theoricalNotesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Notas eliminadas`,
      title: `Eliminadas`,
    };
  }
}
