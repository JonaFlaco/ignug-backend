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

import { ResponseHttpModel } from '@shared/models';

import { Auth } from '@auth/decorators';
import { RubricNotesService } from '../services/rubric-note.service';
import { CreateRubricNoteDto } from '../dto/rubric-notes/create-rubric-note.dto';
import { FilterRubricNoteDto } from '../dto/rubric-notes/filter-rubric-note.dto';
import { UpdateRubricNoteDto } from '../dto/rubric-notes/update-rubric-note.dto';
import { RubricNoteEntity } from '../entities/rubric-note.entity';

@ApiTags('rubric-note')
@Controller('rubric-note')
export class RubricNotesController {
  constructor(private rubricNotesService: RubricNotesService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateRubricNoteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricNotesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Nota del Examén Practico Guardada',
      title: 'Nota Guardada',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricNotesService.catalogue();

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
    @Query() params: FilterRubricNoteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricNotesService.findAll(params);
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
    const serviceResponse = await this.rubricNotesService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateRubricNoteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricNotesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Nota del Examén Practico Guardada Actualizada `,
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
    const serviceResponse = await this.rubricNotesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Nota del Examén Practico Guardada eliminada`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: RubricNoteEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricNotesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Notas del Examén Practico Guardada eliminadas`,
      title: `Eliminado`,
    };
  }
}
