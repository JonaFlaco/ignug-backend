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
  import {
    CreateNoteDto,
    FilterNoteDto,
    UpdateNoteDto,
  } from '@uic/dto';
  import { NoteEntity, TribunalEntity } from '@uic/entities';
  import { ResponseHttpModel } from '@shared/models';
  import { NotesService, TribunalsService } from '@uic/services';
  import { Auth } from '@auth/decorators';
  
  @ApiTags('Notes')
  @Controller('notes')
  export class NotesController {
    constructor(private notesService: NotesService) {}
  
    @ApiOperation({ summary: 'Create One' })
    //@Uic()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateNoteDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.notesService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Creado',
        title: 'Se ha creado el Seguimiento del Estudiante',
      };
    }
  
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.notesService.catalogue();
  
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
      @Query() params: FilterNoteDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.notesService.findAll(params);
  
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
      const serviceResponse = await this.notesService.findOne(id);
  
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
      @Body() payload: UpdateNoteDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.notesService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `Actualizado`,
        title: `Se ha Actualizado las Notas del Estudiante`,
      };
    }
  
    @ApiOperation({ summary: 'Remove One' })
    @Auth()
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.notesService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `Eliminado `,
        title: `Se ha Eliminado el Seguimiento del Estudiante`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: NoteEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.notesService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: `Eliminado`,
        title: `Se ha Eliminado con Éxito`,
      };
    }
  }
  