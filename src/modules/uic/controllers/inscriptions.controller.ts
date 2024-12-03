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
  CreateInscriptionDto,
  FilterInscriptionDto,
  UpdateInscriptionDto,
} from '@uic/dto';
import { InscriptionEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { InscriptionsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('inscriptions')
@Controller('inscriptions')
export class InscriptionsController {
  constructor(private inscriptionsService: InscriptionsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateInscriptionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.inscriptionsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Observación enviada al estudiante',
      title: 'Enviado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.inscriptionsService.catalogue();

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
    @Query() params: FilterInscriptionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.inscriptionsService.findAll(params);

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
    const serviceResponse = await this.inscriptionsService.findOne(id);

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
    @Body() payload: UpdateInscriptionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.inscriptionsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Actualizado`,
      title: `Se ha Atualizado la Inscripción`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.inscriptionsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Eliminado`,
      title: `Se ha Eliminado la Inscripción`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InscriptionEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.inscriptionsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Observación eliminada`,
      title: `Eliminado`,
    };
  }
}
