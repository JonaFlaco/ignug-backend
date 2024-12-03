import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators';
import {
  CreateCoordinatorDto,
  FilterCoordinatorDto,
  UpdateCoordinatorDto,
} from '@uic/dto';
import { CoordinatorsService } from '@uic/services';
import { CoordinatorEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
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

@ApiTags('Coodinators')
@Controller('coodinators')
export class CoodinatorsController {
  constructor(private coodinatorsService: CoordinatorsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCoordinatorDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.coodinatorsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Project Plan created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.coodinatorsService.catalogue();

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
    @Query() params: FilterCoordinatorDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.coodinatorsService.findAll(params);
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
    const serviceResponse = await this.coodinatorsService.findOne(id);
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
    @Body() payload: UpdateCoordinatorDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.coodinatorsService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `Project Plan updated ${id}`,
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
    const serviceResponse = await this.coodinatorsService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Coodinator deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CoordinatorEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.coodinatorsService.removeAll(payload);
    return {
      data: serviceResponse.data,
      message: `Coodinators deleted`,
      title: `Deleted`,
    };
  }
}
