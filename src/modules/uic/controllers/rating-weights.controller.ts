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
import { RatingWeightsService } from '@uic/services';
import {
  CreateRatingWeightDto,
  FilterRatingWeightDto,
  UpdateRatingWeightDto,
} from '@uic/dto';
import { RatingWeightEntity } from '@uic/entities';

@ApiTags('RatingWeights')
@Controller('ratingWeights')
export class RatingWeightsController {
  constructor(private ratingWeightService: RatingWeightsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateRatingWeightDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.ratingWeightService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Pesos configurados',
      title: 'Guardado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.ratingWeightService.catalogue();

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
    @Query() params: FilterRatingWeightDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.ratingWeightService.findAll(params);

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
    const serviceResponse = await this.ratingWeightService.findOne(id);

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
    @Body() payload: UpdateRatingWeightDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.ratingWeightService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Pesos actualizados`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.ratingWeightService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Pesos eliminados`,
      title: `Eliminados`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: RatingWeightEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.ratingWeightService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Pesos eliminados`,
      title: `Eliminados`,
    };
  }
}
