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
  CreateDownloadFormatDto,
  FilterDownloadFormatDto,
  UpdateDownloadFormatDto,
} from '@uic/dto';
import { DownloadFormatEntity } from '@uic/entities';
import { DownloadFormatsService, FormatsService } from '@uic/services';

@ApiTags('Download-Formats')
@Controller('download-formats')
export class DownloadFormatsController {
  constructor(private downloadFormatService: DownloadFormatsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateDownloadFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.downloadFormatService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Formato Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.downloadFormatService.catalogue();

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
    @Query() params: FilterDownloadFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.downloadFormatService.findAll(params);

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
    const serviceResponse = await this.downloadFormatService.findOne(id);

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
    @Body() payload: UpdateDownloadFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.downloadFormatService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Formato Actualizado`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.downloadFormatService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Formato Eliminado`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: DownloadFormatEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.downloadFormatService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Formatos Eliminado`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Download' })
  @Get('download/:file')
  @HttpCode(HttpStatus.OK)
  async streamable(@Res() res, @Param('file') filename: string): Promise<Blob> {
    const file = await this.downloadFormatService.filesBuffer(filename);
    return res.send(file); // 👈 supports Buffer and Stream
  }
}
