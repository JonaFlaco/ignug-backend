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
import { CreateYearDto, FilterYearDto, UpdateYearDto } from '@core/dto';
import { YearEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { YearsService } from '@core/services';
import { Auth } from '@auth/decorators';

@ApiTags('years')
@Controller('years')
export class YearsController {
  constructor(private yearsService: YearsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateYearDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.yearsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Year created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.yearsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  /*}@ApiOperation({ summary: 'Years for sidebar' })
  @Get('sidebar')
  @HttpCode(HttpStatus.OK)
  async getYearsForSidebar(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.yearsService.getYearsForSidebar();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue for Sidebar`,
      title: `Catalogue for Sidebar`,
    };
  }*/

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterYearDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.yearsService.findAll(params);

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
    const serviceResponse = await this.yearsService.findOne(id);

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
    @Body() payload: UpdateYearDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.yearsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Year updated ${id}`,
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
    const serviceResponse = await this.yearsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Year deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: YearEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.yearsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Years deleted`,
      title: `Deleted`,
    };
  }
}
