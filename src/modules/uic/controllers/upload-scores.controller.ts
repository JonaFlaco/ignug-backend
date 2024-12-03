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
import { CreateUploadScoreDto, FilterUploadScoreDto, UpdateUploadScoreDto } from '@uic/dto';
import { UploadScoreEntity } from '@uic/entities';
import { UploadScoresService } from '@uic/services';


@ApiTags('Upload-Scores')
@Controller('upload-scores')
export class UploadScoresController {
  constructor(private uploadScoreService: UploadScoresService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUploadScoreDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadScoreService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Nota  Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadScoreService.catalogue();

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
  async findAll(@Query() params: FilterUploadScoreDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadScoreService.findAll(params);

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
    const serviceResponse = await this.uploadScoreService.findOne(id);

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
    @Body() payload: UpdateUploadScoreDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadScoreService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Nota Actualizado ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadScoreService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Nota Eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload:UploadScoreEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadScoreService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Nota Eliminada`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Download' })
  @Get('download/:file')
  @HttpCode(HttpStatus.OK)
  async streamable(@Res() res,@Param('file') filename: string, ): Promise<Blob> {
    const file = await this.uploadScoreService.filesBuffer(filename);
    return res.send(file) // 👈 supports Buffer and Stream
  }

}
