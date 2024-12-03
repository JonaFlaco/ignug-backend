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
import { ResponseHttpModel } from '@shared/models';
import {
  CreateUploadProjectDto,
  FilterUploadProjectDto,
  UpdateUploadProjectDto,
} from '@uic/dto';
import { UploadProjectEntity } from '@uic/entities';
import { UploadProjectsService } from '@uic/services';

@ApiTags('Upload-Projects')
@Controller('upload-projects')
export class UploadProjectsController {
  constructor(private uploadProjectService: UploadProjectsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateUploadProjectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadProjectService.create(payload);

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
    const serviceResponse = await this.uploadProjectService.catalogue();

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
    @Query() params: FilterUploadProjectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadProjectService.findAll(params);

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
    const serviceResponse = await this.uploadProjectService.findOne(id);

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
    @Body() payload: UpdateUploadProjectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadProjectService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `datos Actualizado ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadProjectService.remove(id);

    return {
      data: serviceResponse.data,
      message: `datos Eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: UploadProjectEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadProjectService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Nota Eliminada`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Download' })
  @Get('download/:file')
  @HttpCode(HttpStatus.OK)
  async streamable(@Res() res, @Param('file') filename: string): Promise<Blob> {
    const file = await this.uploadProjectService.filesBuffer(filename);
    return res.send(file); // 👈 supports Buffer and Stream
  }
}
