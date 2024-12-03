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
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateRequirementDto,
  FilterRequirementDto,
  UpdateRequirementDto,
} from '@uic/dto';
import { RequirementEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { RequirementsService } from '@uic/services';

@ApiTags('Requirements')
@Controller('requirements')
export class RequirementsController {
  constructor(private requirementsService: RequirementsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Su Requerimiento ha sido creada correctamente',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.catalogue();

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
    @Query() params: FilterRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.findAll(params);

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
    const serviceResponse = await this.requirementsService.findOne(id);

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
    @Body() payload: UpdateRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Requerimiento Actualizado ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Eliminar Requerimiento ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: RequirementEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Requerimientos Eliminados`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Find by planning' })
  @Get('plannings/:id')
  @HttpCode(HttpStatus.OK)
  async findByPlanning(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() params: FilterRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.findByPlanning(
      id,
      params,
    );

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `requirementssByplanning`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Change Status' })
  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.changeStatus(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Status updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Download' })
    @Get('download/:file')
    @HttpCode(HttpStatus.OK)
    async streamable(@Res() res,@Param('file') filename: string, ): Promise<Blob> {
      const file = await this.requirementsService.filesBuffer(filename);
      return res.send(file) // 👈 supports Buffer and Stream
    }
}
