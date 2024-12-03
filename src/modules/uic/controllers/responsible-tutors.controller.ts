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
  import { CreateResponsibleTutorDto, FilterResponsibleTutorDto, UpdateResponsibleTutorDto } from '@uic/dto';
  import { ResponsibleTutorEntity } from '@uic/entities';
  import { ResponseHttpModel } from '@shared/models';
  import { ResponsibleTutorsService } from '@uic/services';
  
  @ApiTags('responsible-tutors')
  @Controller('responsible-tutors')
  export class ResponsibleTutorsController {
    constructor(private responsibleTutorsService: ResponsibleTutorsService) {}
  
    @ApiOperation({ summary: 'Create One' })
    @Auth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateResponsibleTutorDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.responsibleTutorsService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'ResponsibleTutor created',
        title: 'Created',
      };
    }
  
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.responsibleTutorsService.catalogue();
  
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
    async findAll(@Query() params: FilterResponsibleTutorDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.responsibleTutorsService.findAll(params);
  
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
      const serviceResponse = await this.responsibleTutorsService.findOne(id);
  
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
      @Body() payload: UpdateResponsibleTutorDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.responsibleTutorsService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `ResponsibleTutor updated ${id}`,
        title: `Updated`,
      };
    }
  
    @ApiOperation({ summary: 'Remove One' })
    @Auth()
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.responsibleTutorsService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `ResponsibleTutor deleted ${id}`,
        title: `Deleted`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ResponsibleTutorEntity[]): Promise<ResponseHttpModel> {
      const serviceResponse = await this.responsibleTutorsService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: `ResponsibleTutors deleted`,
        title: `Deleted`,
      };
    }
  }