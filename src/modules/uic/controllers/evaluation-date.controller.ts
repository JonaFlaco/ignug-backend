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
import { EvaluationDateService } from '@uic/services';
import { CreateEvaluationDateDto, FilterEvaluationDateDto, UpdateEvaluationDateDto } from '@uic/dto';
import { EvaluationDateEntity } from '@uic/entities';

@ApiTags('EvaluationDate')
@Controller('evaluationDate')
export class EvaluationDateController {
  constructor(private evaluationDateService: EvaluationDateService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEvaluationDateDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationDateService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'EvaluationDate created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'EvaluationDate' })
  @Get('evaluationDate')
  @HttpCode(HttpStatus.OK)
  async evaluationDate(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationDateService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `evaluationDate`,
      title: `EvaluationDate`,
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterEvaluationDateDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationDateService.findAll(params);

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
    const serviceResponse = await this.evaluationDateService.findOne(id);

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
    @Body() payload: UpdateEvaluationDateDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationDateService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `EvaluationDate updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationDateService.remove(id);

    return {
      data: serviceResponse.data,
      message: `EvaluationDate deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: EvaluationDateEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.evaluationDateService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Teachers deleted`,
      title: `Deleted`,
    };
  }
}
