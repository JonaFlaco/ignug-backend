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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateFormatDto, FilterFormatDto, UpdateFormatDto } from '@uic/dto';
import { FormatEntity } from '@uic/entities';
import { FormatsService } from '@uic/services';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { renameDocs } from 'src/doc/helpers/doc.helpers';
import { any } from 'joi';

@ApiTags('Formats')
@Controller('formats')
export class FormatsController {
  constructor(private formatService: FormatsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateFormatDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.formatService.create(payload);

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
    const serviceResponse = await this.formatService.catalogue();

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
  async findAll(@Query() params: FilterFormatDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.formatService.findAll(params);

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
    const serviceResponse = await this.formatService.findOne(id);

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
    @Body() payload: UpdateFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.formatService.update(id, payload);

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
    const serviceResponse = await this.formatService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Formato Eliminado`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: FormatEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.formatService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Formatos Eliminado`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Upload and store the file' })
  // @Auth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseHttpModel> {
    // const serviceResponse = await this.requirementFormatsService.upload(file);

    return {
      data: true,
      message: 'Formato actualizado',
      title: 'Enviado',
    };
  }
}
