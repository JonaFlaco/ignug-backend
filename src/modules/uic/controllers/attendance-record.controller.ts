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
  CreateAttendanceRecordDto,
  FilterAttendanceRecordDto,
  UpdateAttendanceRecordDto,
} from '@uic/dto';
import { AttendanceRecordEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import {AttendanceRecordService } from '@uic/services';

@ApiTags('Upload-requiremets')
@Controller('upload-requirements')
export class AttendanceRecordController {
  constructor(
    private attendanceRecordService: AttendanceRecordService,
  ) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateAttendanceRecordDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.attendanceRecordService.create(
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

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterAttendanceRecordDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.attendanceRecordService.findAll(
      params,
    );

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
    const serviceResponse = await this.attendanceRecordService.findOne(
      id,
    );

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
    @Body() payload: UpdateAttendanceRecordDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.attendanceRecordService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Actualización del envío de archivos de ${id}`,
      title: `Actualizado el envío`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.attendanceRecordService.remove(
      id,
    );

    return {
      data: serviceResponse.data,
      message: `Envío de archivos eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: AttendanceRecordEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse =
      await this.attendanceRecordService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Envío Eliminado`,
      title: `Eliminado`,
    };
  }
}
