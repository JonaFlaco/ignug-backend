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
import { CreateAssignamentDto, FilterAssignamentDto, UpdateAssignamentDto } from '@uic/dto';
import { AssignamentEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { AssignamentsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('assignaments')
@Controller('assignaments')
export class AssignamentsController {
  constructor(private assignamentsService: AssignamentsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateAssignamentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.assignamentsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Assignament created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.assignamentsService.catalogue();

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
  async findAll(@Query() params: FilterAssignamentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.assignamentsService.findAll(params);

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
    const serviceResponse = await this.assignamentsService.findOne(id);

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
    @Body() payload: UpdateAssignamentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.assignamentsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Assignament updated ${id}`,
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
    const serviceResponse = await this.assignamentsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Assignament deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: AssignamentEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.assignamentsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Assignaments deleted`,
      title: `Deleted`,
    };
  }
}
