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
import { TotalCaseEntity } from '@uic/entities';
import {
  CreateTotalCaseDto,
  FilterTotalCaseDto,
  UpdateTotalCaseDto,
} from '@uic/dto';
import { TotalCasesService } from '@uic/services';

@ApiTags('TotalCases')
@Controller('total-cases')
export class TotalCasesController {
  constructor(private totalCasesService: TotalCasesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateTotalCaseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.totalCasesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Nota Final Examen Practico Creada',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.totalCasesService.catalogue();

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
    @Query() params: FilterTotalCaseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.totalCasesService.findAll(params);

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
    const serviceResponse = await this.totalCasesService.findOne(id);

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
    @Body() payload: UpdateTotalCaseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.totalCasesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Nota Final Examen Practico Actualizada`,
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
    const serviceResponse = await this.totalCasesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Nota Final Examen Practico Eliminada`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: TotalCaseEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.totalCasesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Nota Final Examen Practico Eliminadas`,
      title: `Eliminados`,
    };
  }
}
