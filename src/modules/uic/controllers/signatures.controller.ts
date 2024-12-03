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
import { CreateSignatureDto, FilterSignatureDto, UpdateSignatureDto } from '@uic/dto';
import { SignatureEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { SignaturesService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('signatures')
@Controller('signatures')
export class SignaturesController {
  constructor(private signaturesService: SignaturesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSignatureDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'La asignatura ha sido creada',
      title: 'Asignatura Creada',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }
  @ApiOperation({ summary: 'Find by preparationCourse' })
  @Get('preparationCourses/:id')
  @HttpCode(HttpStatus.OK)
  async findByPreparationCourse(@Param('id', ParseUUIDPipe) id: string,@Query() params: FilterSignatureDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.findByPreparationCourse(id,params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `signaturesBycourse`,
      title: 'Success',
    };
  } 

  @ApiOperation({ summary: 'Find by Preparation Course TimeLine' })
  @Get('timeline/:id')
  @HttpCode(HttpStatus.OK)
  async findByPlanninTimeline(@Param('id', ParseUUIDPipe) id: string,@Query() params: FilterSignatureDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.findByPreparationCourseTimeline(id,params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `signaturesByplanning`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterSignatureDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.findAll(params);

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
    const serviceResponse = await this.signaturesService.findOne(id);

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
    @Body() payload: UpdateSignatureDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `La asignatura ha sido actualizada`,
      title: `Asignatura Actualizada`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `La asignatura ha sido eliminada`,
      title: `Asignatura Eliminada`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: SignatureEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Las asignaturas han sido eliminadas`,
      title: `Asignaturas Eliminadas`,
    };
  }
}
