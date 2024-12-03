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
import { Auth } from '@auth/decorators';
import {
  CreateUploadRequirementRequestDto,
  FilterUploadRequirementRequestDto,
  UpdateUploadRequirementRequestDto,
} from '@uic/dto';
import { UploadRequirementRequestEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { UploadRequirementRequestsService } from '@uic/services';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, DiskStorageOptions } from 'multer';
import { renameImage, fileFilter } from '../helpers/images.helper';

@ApiTags('Upload-requiremets')
@Controller('upload-requirements')
export class UploadRequirementRequestsController {
  constructor(
    private uploadRequirementRequestsService: UploadRequirementRequestsService,
  ) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateUploadRequirementRequestDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.uploadRequirementRequestsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Sus archivos se han enviado correctamente',
      title: 'Archivos Enviados',
    };
  }

  // @ApiOperation({ summary: 'Catalogue' })
  // @Get('catalogue')
  // @HttpCode(HttpStatus.OK)
  // async catalogue(): Promise<ResponseHttpModel> {
  //   const serviceResponse =
  //     await this.uploadRequirementRequestsService.catalogue();

  //   return {
  //     data: serviceResponse.data,
  //     pagination: serviceResponse.pagination,
  //     message: `catalogue`,
  //     title: `Catalogue`,
  //   };
  // }

  // @ApiOperation({ summary: 'Find All' })
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async findAll(
  //   @Query() params: FilterUploadRequirementRequestDto,
  // ): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.uploadRequirementRequestsService.findAll(
  //     params,
  //   );

  //   return {
  //     data: serviceResponse.data,
  //     pagination: serviceResponse.pagination,
  //     message: `index`,
  //     title: 'Success',
  //   };
  // }

  // @ApiOperation({ summary: 'Find One' })
  // @Auth()
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async findOne(
  //   @Param('id', ParseUUIDPipe) id: string,
  // ): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.uploadRequirementRequestsService.findOne(
  //     id,
  //   );

  //   return {
  //     data: serviceResponse.data,
  //     message: `show ${id}`,
  //     title: `Success`,
  //   };
  // }

  // @ApiOperation({ summary: 'Update One' })
  // @Auth()
  // @Put(':id')
  // @HttpCode(HttpStatus.CREATED)
  // async update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() payload: UpdateUploadRequirementRequestDto,
  // ): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.uploadRequirementRequestsService.update(
  //     id,
  //     payload,
  //   );

  //   return {
  //     data: serviceResponse.data,
  //     message: `Actualización del envío de archivos de ${id}`,
  //     title: `Actualizado el envío`,
  //   };
  // }

  // @ApiOperation({ summary: 'Remove One' })
  // @Auth()
  // @Delete(':id')
  // @HttpCode(HttpStatus.CREATED)
  // async remove(
  //   @Param('id', ParseUUIDPipe) id: string,
  // ): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.uploadRequirementRequestsService.remove(
  //     id,
  //   );

  //   return {
  //     data: serviceResponse.data,
  //     message: `Envío de archivos eliminado ${id}`,
  //     title: `Eliminado`,
  //   };
  // }

  // @ApiOperation({ summary: 'Remove All' })
  // @Auth()
  // @Patch('remove-all')
  // @HttpCode(HttpStatus.CREATED)
  // async removeAll(
  //   @Body() payload: UploadRequirementRequestEntity[],
  // ): Promise<ResponseHttpModel> {
  //   const serviceResponse =
  //     await this.uploadRequirementRequestsService.removeAll(payload);

  //   return {
  //     data: serviceResponse.data,
  //     message: `Envío Eliminado`,
  //     title: `Eliminado`,
  //   };
  // }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: renameImage,
      }),
      fileFilter: fileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
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

    console.log(file);
    return {
      data: true,
      message: 'Formato actualizado',
      title: 'Uploaded',
    };
  }
}
