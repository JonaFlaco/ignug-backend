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
  CreateRegisterDto,
  FilterRegisterDto,
  UpdateRegisterDto,
} from '@uic/dto';
import { RegisterEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { RegistersService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('registers')
@Controller('registers')
export class RegistersController {
  constructor(private registersService: RegistersService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateRegisterDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.registersService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Asignatura created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.registersService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  /*}@ApiOperation({ summary: 'Registers for sidebar' })
  @Get('sidebar')
  @HttpCode(HttpStatus.OK)
  async getRegistersForSidebar(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.registersService.getRegistersForSidebar();

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
  async findAll(
    @Query() params: FilterRegisterDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.registersService.findAll(params);

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
    const serviceResponse = await this.registersService.findOne(id);

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
    @Body() payload: UpdateRegisterDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.registersService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `asignatura updated ${id}`,
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
    const serviceResponse = await this.registersService.remove(id);

    return {
      data: serviceResponse.data,
      message: `asignatura deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: RegisterEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.registersService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `asignaturas deleted`,
      title: `Deleted`,
    };
  }
}
