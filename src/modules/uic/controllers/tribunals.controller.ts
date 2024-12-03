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
import {
  CreateTribunalDto,
  FilterTribunalDto,
  UpdateTribunalDto,
} from '@uic/dto';
import { TribunalEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { TribunalsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('Tribunals')
@Controller('tribunals')
export class TribunalsController {
  constructor(private tribunalsService: TribunalsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateTribunalDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tribunalsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Tribunal created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tribunalsService.catalogue();

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
    @Query() params: FilterTribunalDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tribunalsService.findAll(params);

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
    const serviceResponse = await this.tribunalsService.findOne(id);

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
    @Body() payload: UpdateTribunalDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tribunalsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Tribunal updated ${id}`,
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
    const serviceResponse = await this.tribunalsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Tribunal deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: TribunalEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tribunalsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Tribunals deleted`,
      title: `Deleted`,
    };
  }
}
