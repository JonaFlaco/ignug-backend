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
import { Auth } from '@auth/decorators';
import { NoteDefensesService } from '@uic/services';
import { CreateNoteDefenseDto, FilterNoteDefenseDto, UpdateNoteDefenseDto } from '@uic/dto';
import { NoteDefenseEntity } from '../entities/note-defense.entity';

@ApiTags('NoteDefenses')
@Controller('note-defenses')
export class NoteDefensesController {
  constructor(private noteDefensesService: NoteDefensesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateNoteDefenseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteDefensesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Nota de Defensa Creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteDefensesService.catalogue();

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
    @Query() params: FilterNoteDefenseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteDefensesService.findAll(params);

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
    const serviceResponse = await this.noteDefensesService.findOne(id);

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
    @Body() payload: UpdateNoteDefenseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteDefensesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Nota de Defensa Actualizada`,
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
    const serviceResponse = await this.noteDefensesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Nota de Defensa Eliminada `,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: NoteDefenseEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteDefensesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Notas de Defensa Eliminadas`,
      title: `Eliminados`,
    };
  }
}
