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
//import { Uic } from '@uic/decorators';
import {
  CreateCatalogueTypeDto,
  FilterCatalogueTypeDto,
  UpdateCatalogueTypeDto,
} from '@uic/dto';
import { CatalogueTypeEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { CatalogueTypeService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('catalogueTypes')
@Controller('catalogueTypes')
export class CatalogueTypesController {
  constructor(private catalogueTypesService: CatalogueTypeService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCatalogueTypeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.create(payload);

    return {
      data: serviceResponse.data,
      message: ' Su  Tipo de catalogo ha sido creada correctamente ',
      title: 'Tipo de catalogo creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.catalogue();

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
    @Query() params: FilterCatalogueTypeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.findAll(params);

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
    const serviceResponse = await this.catalogueTypesService.findOne(id);

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
    @Body() payload: UpdateCatalogueTypeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: ` El Tipo de Catalogo ha sido Actualizado `,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.remove(id);

    return {
      data: serviceResponse.data,
      message: ` El Tipo de Catalogo ha sido eliminado `,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CatalogueTypeEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: ` Los Tipos de Catalogos han sido Eliminado `,
      title: `Eliminados`,
    };
  }
}
