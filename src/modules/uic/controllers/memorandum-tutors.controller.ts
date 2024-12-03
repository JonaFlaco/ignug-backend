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
import { MemorandumTutorsService } from '@uic/services';
import {
  CreateMemorandumTutorDto,
  FilterMemorandumTutorDto,
  UpdateMemorandumTutorDto,
} from '@uic/dto';
import { MemorandumTutorEntity } from '@uic/entities';

@ApiTags('MemorandumTutors')
@Controller('memorandumTutors')
export class MemorandumTutorsController {
  constructor(private memorandumTutorService: MemorandumTutorsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateMemorandumTutorDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumTutorService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Memorando creado',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumTutorService.catalogue();

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
    @Query() params: FilterMemorandumTutorDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumTutorService.findAll(params);

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
    const serviceResponse = await this.memorandumTutorService.findOne(id);

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
    @Body() payload: UpdateMemorandumTutorDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumTutorService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Memorando Actualizado`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumTutorService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Memorando eliminado`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: MemorandumTutorEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.memorandumTutorService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Memorandos eliminados`,
      title: `Deleted`,
    };
  }
}
