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
import {
  CreateProjectBenchDto,
  FilterProjectBenchDto,
  UpdateProjectBenchDto,
} from '@uic/dto';
import { ProjectBenchEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { ProjectBenchsService } from '@uic/services';

@ApiTags('project-benchs')
@Controller('project-benchs')
export class ProjectBenchsController {
  constructor(private projectBenchsService: ProjectBenchsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateProjectBenchDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectBenchsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Banco del proyecto creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectBenchsService.catalogue();

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
    @Query() params: FilterProjectBenchDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectBenchsService.findAll(params);

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
    const serviceResponse = await this.projectBenchsService.findOne(id);

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
    @Body() payload: UpdateProjectBenchDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectBenchsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Banco del Proyecto Actualizado`,
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
    const serviceResponse = await this.projectBenchsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Banco del proyecto Borrado`,
      title: `Borrado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ProjectBenchEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectBenchsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Bancos del Proyecto Borrados`,
      title: `Borrado`,
    };
  }
}
