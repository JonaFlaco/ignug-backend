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
  CreateSignatureDto,
  FilterSignatureDto,
  UpdateSignatureDto,
} from '@core/dto';
import { SignatureCatEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { SignatureService } from '@core/services';
import { Auth } from '@auth/decorators';

@ApiTags('signaturesCat')
@Controller('signaturesCat')
export class SignaturesController {
  constructor(private signaturesService: SignatureService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateSignatureDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.create(payload);

    return {
      data: serviceResponse.data,
      message: ' La asignatura ha sido creada correctamente ',
      title: 'Asignatura creada',
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

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterSignatureDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success Nad',
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
      message: ` La asignatura ha sido Actualizado `,
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
      message: ` La asignatura ha sido eliminada `,
      title: `Asignatura Eliminada`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: SignatureCatEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.signaturesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Las asignaturas ha sido Eliminadas `,
      title: `Asignaturas Eliminadas`,
    };
  }
}
