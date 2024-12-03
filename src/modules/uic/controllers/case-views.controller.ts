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
import { CaseViewsService } from '@uic/services';
import {
  CreateCaseViewDto,
  FilterCaseViewDto,
  UpdateCaseViewDto,
} from '@uic/dto';
import { CaseViewEntity } from '@uic/entities';

@ApiTags('Case-Views')
@Controller('case-views')
export class CaseViewsController {
  constructor(private caseViewService: CaseViewsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCaseViewDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.caseViewService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'datos Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.caseViewService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `catalogue`,
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterCaseViewDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.caseViewService.findAll(params);

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
    const serviceResponse = await this.caseViewService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCaseViewDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.caseViewService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Datos Actualizados ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.caseViewService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Dato Eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CaseViewEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.caseViewService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Datos Eliminados`,
      title: `Eliminados`,
    };
  }
}
