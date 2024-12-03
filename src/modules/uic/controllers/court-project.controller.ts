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
import { CourtProjectsService } from '@uic/services';
import {
  CreateCourtProjectDto,
  FilterCourtProjectDto,
  UpdateCourtProjectDto,
} from '@uic/dto';
import { CourtProjectEntity } from '@uic/entities';

@ApiTags('CourtProjects')
@Controller('court-projects')
export class CourtProjectsController {
  constructor(private courtProjectService: CourtProjectsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCourtProjectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.courtProjectService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'CourtProject created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'CourtProject' })
  @Get('courtProject')
  @HttpCode(HttpStatus.OK)
  async courtProject(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.courtProjectService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `CourtProject`,
      title: `CourtProject`,
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterCourtProjectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.courtProjectService.findAll(params);

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
    const serviceResponse = await this.courtProjectService.findOne(id);

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
    @Body() payload: UpdateCourtProjectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.courtProjectService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `CourtProject updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.courtProjectService.remove(id);

    return {
      data: serviceResponse.data,
      message: `CourtProject deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CourtProjectEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.courtProjectService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `CourtProject deleted`,
      title: `Deleted`,
    };
  }
}
