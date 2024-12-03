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
  CreatePreparationCourseDto,
  FilterPreparationCourseDto,
  UpdatePreparationCourseDto,
} from '@uic/dto';
import { PreparationCourseEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { PreparationCoursesService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('preparationCourses')
@Controller('preparationCourses')
export class PreparationCoursesController {
  constructor(private preparationCoursesService: PreparationCoursesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreatePreparationCourseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Curso de actualización creado con exito',
      title: 'Curso creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }


  @ApiOperation({ summary: 'Se han encontrado' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterPreparationCourseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Se ha encontrado' })
  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Se ha actualizado' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePreparationCourseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: ` Curso de actualizacion Actualizado correctamente `,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Se ha eliminado' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Curso de actualizacion eliminado`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: PreparationCourseEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.preparationCoursesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Preparation Courses Eliminados `,
      title: `Eliminados`,
    };
  }
}
