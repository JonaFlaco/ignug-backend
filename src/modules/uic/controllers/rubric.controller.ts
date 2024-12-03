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
import { CreateRubricDto, FilterRubricDto, UpdateRubricDto } from '@uic/dto';
import { RubricEntity, TeacherEntity } from '@uic/entities';
import { RubricsService } from '@uic/services';

@ApiTags('Rubrics')
@Controller('rubrics')
export class RubricsController {
  constructor(private rubricService: RubricsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateRubricDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Rubrica Creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Rubric' })
  @Get('rubric')
  @HttpCode(HttpStatus.OK)
  async teachear(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Rubrica`,
      title: `Rubrica`,
    };
  }

  @ApiOperation({ summary: 'Find By Career' })
  @Get('careers/:id')
  @HttpCode(HttpStatus.OK)
  async findByCareer(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.findByCareer(id);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterRubricDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateRubricDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Rubrica Actualizada`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Rubrica Eliminada`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: RubricEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rubricService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Rubricas Eliminadas`,
      title: `Eliminados`,
    };
  }
}
