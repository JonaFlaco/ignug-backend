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
  CreateEstudianteDto,
  FilterEstudianteDto,
  UpdateEstudianteDto,
} from '@uic/dto';
import { EstudianteEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { EstudiantesService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('Estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private estudiantesService: EstudiantesService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateEstudianteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.estudiantesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Estudiante created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.estudiantesService.catalogue();

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
    @Query() params: FilterEstudianteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.estudiantesService.findAll(params);

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
    const serviceResponse = await this.estudiantesService.findOne(id);

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
    @Body() payload: UpdateEstudianteDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.estudiantesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Estudiante updated ${id}`,
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
    const serviceResponse = await this.estudiantesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Estudiante deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: EstudianteEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.estudiantesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Estudiantes deleted`,
      title: `Deleted`,
    };
  }
}
