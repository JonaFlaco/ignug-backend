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
  //import { Uic } from '@uic/decorators';
  import { CreateStudentDegreeDto, FilterStudentDegreeDto, UpdateStudentDegreeDto } from '@uic/dto';
  import { StudentDegreeEntity } from '@uic/entities';
  import { ResponseHttpModel } from '@shared/models';
  import { StudentsDegreeService } from '@uic/services';
  
  @ApiTags('Students-Degree')
  @Controller('students-degree')
  export class StudentsDegreeController {
    constructor(private studentsDegreeService: StudentsDegreeService) {}
  
    @ApiOperation({ summary: 'Create One' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateStudentDegreeDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.studentsDegreeService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'StudentDegree created',
        title: 'Created',
      };
    }
  
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.studentsDegreeService.catalogue();
  
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
    async findAll(@Query() params: FilterStudentDegreeDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.studentsDegreeService.findAll(params);
  
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
      const serviceResponse = await this.studentsDegreeService.findOne(id);
  
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
      @Body() payload: UpdateStudentDegreeDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.studentsDegreeService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `StudentDegree updated ${id}`,
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
      const serviceResponse = await this.studentsDegreeService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `StudentDegree deleted ${id}`,
        title: `Deleted`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: StudentDegreeEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.studentsDegreeService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: `StudentDegree deleted`,
        title: `Deleted`,
      };
    }
  }
  