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
import { MemorandumsService } from '@uic/services';
import {
  CreateMemorandumDto,
  FilterMemorandumDto,
  UpdateMemorandumDto,
} from '@uic/dto';
import { MemorandumEntity } from '@uic/entities';

@ApiTags('Memorandums')
@Controller('memorandums')
export class MemorandumsController {
  constructor(private memorandumService: MemorandumsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateMemorandumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Memorando creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumService.catalogue();

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
    @Query() params: FilterMemorandumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumService.findAll(params);

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
    const serviceResponse = await this.memorandumService.findOne(id);

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
    @Body() payload: UpdateMemorandumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Memorando Actualizado`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Memorando eliminado`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: MemorandumEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Memorandos eliminados`,
      title: `Eliminados`,
    };
  }
}
