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
  CreatePracticalCaseDto,
  FilterPracticalCaseDto,
  UpdatePracticalCaseDto,
} from '@uic/dto';
import { PracticalCaseEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { PracticalCasesService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('practicalCases')
@Controller('practicalCases')
export class PracticalCasesController {
  constructor(private practicalCasesService: PracticalCasesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreatePracticalCaseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.practicalCasesService.create(payload);

    return {
      data: serviceResponse.data,
      message: ' creada correctamente ',
      title: 'Caso practico creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.practicalCasesService.catalogue();

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
    @Query() params: FilterPracticalCaseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.practicalCasesService.findAll(params);

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
    const serviceResponse = await this.practicalCasesService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Find by Practical Case id TimeLine' })
  @Get('timeline/:id')
  @HttpCode(HttpStatus.OK)
  async findByPlanninTimeline(@Param('id', ParseUUIDPipe) id: string,@Query() params: FilterPracticalCaseDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.practicalCasesService.findByPracticalCaseIdTimeline(id,params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `practicalCasesById`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Se ha actualizado' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePracticalCaseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.practicalCasesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: ` Caso practico Actualizado `,
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
    const serviceResponse = await this.practicalCasesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Caso practico eliminado`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: PracticalCaseEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.practicalCasesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Preparation Courses Eliminados `,
      title: `Eliminados`,
    };
  }
}
