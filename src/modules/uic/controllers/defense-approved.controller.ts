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
import { Auth } from '@auth/decorators';
import { DefenseApprovedsService } from '@uic/services';
import { CreateDefenseApprovedDto, FilterDefenseApprovedDto, UpdateDefenseApprovedDto } from '@uic/dto';
import { DefenseApprovedEntity } from '../entities/defense-approved.entity';


@ApiTags('DefenseApproveds')
@Controller('defense-approveds')
export class DefenseApprovedsController {
  constructor(private defenseApprovedsService: DefenseApprovedsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateDefenseApprovedDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.defenseApprovedsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Note Defense created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.defenseApprovedsService.catalogue();

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
    @Query() params: FilterDefenseApprovedDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.defenseApprovedsService.findAll(params);

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
    const serviceResponse = await this.defenseApprovedsService.findOne(id);

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
    @Body() payload: UpdateDefenseApprovedDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.defenseApprovedsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Note Defense updated ${id}`,
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
    const serviceResponse = await this.defenseApprovedsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Note Defense deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: DefenseApprovedEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.defenseApprovedsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `DefenseApproveds deleted`,
      title: `Deleted`,
    };
  }
}
