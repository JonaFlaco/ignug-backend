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
import { ResponseHttpModel } from '@shared/models';
import { IndividualDefenseEntity } from '../entities/individual-defense.entity';
import {
  CreateIndividualDefenseDto,
  FilterIndividualDefenseDto,
  UpdateIndividualDefenseDto,
} from '@uic/dto';
import { IndividualDefensesService } from '@uic/services';
@ApiTags('IndividualDefenes')
@Controller('individual-defenses')
export class IndividualDefensesController {
  constructor(private individualDefenseService: IndividualDefensesService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateIndividualDefenseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.individualDefenseService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Notas Colocadas',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.individualDefenseService.catalogue();

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
    @Query() params: FilterIndividualDefenseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.individualDefenseService.findAll(params);

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
    const serviceResponse = await this.individualDefenseService.findOne(id);

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
    @Body() payload: UpdateIndividualDefenseDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.individualDefenseService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Notas actualizadas`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.individualDefenseService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Nota eliminada`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: IndividualDefenseEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.individualDefenseService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Notas eliminadas`,
      title: `Deleted`,
    };
  }
}
