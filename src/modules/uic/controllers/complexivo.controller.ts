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
  CreateComplexivoDto,
  FilterComplexivoDto,
  UpdateComplexivoDto,
} from '@uic/dto';
import { ComplexivoEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { ComplexivosService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('Complexivos')
@Controller('complexivos')
export class ComplexivosController {
  constructor(private complexivosService: ComplexivosService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateComplexivoDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexivosService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Complexivo created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexivosService.catalogue();

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
    @Query() params: FilterComplexivoDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexivosService.findAll(params);

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
    const serviceResponse = await this.complexivosService.findOne(id);

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
    @Body() payload: UpdateComplexivoDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexivosService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Complexivo updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexivosService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Complexivo deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ComplexivoEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.complexivosService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Complexivos deleted`,
      title: `Deleted`,
    };
  }
}
