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
import { Auth } from '@auth/decorators';
import {
  CreateReviewRequirementDto,
  FilterReviewRequirementDto,
  UpdateReviewRequirementDto,
} from '@uic/dto';
import { ReviewRequirementEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { ReviewRequirementsService } from '../services/review-requirements.service';

@ApiTags('Review-requiremets')
@Controller('review-requirements')
export class ReviewRequirementsController {
  constructor(private reviewRequirementsService: ReviewRequirementsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateReviewRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.reviewRequirementsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Revisión de los Requerimientos',
      title: 'Se ha realizado la revisión con éxito',
    };
  }

  // @ApiOperation({ summary: 'Catalogue' })
  // @Get('catalogue')
  // @HttpCode(HttpStatus.OK)
  // async catalogue(): Promise<ResponseHttpModel> {
  //   const serviceResponse =
  //     await this.uploadRequirementRequestsService.catalogue();

  //   return {
  //     data: serviceResponse.data,
  //     pagination: serviceResponse.pagination,
  //     message: `catalogue`,
  //     title: `Catalogue`,
  //   };
  // }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterReviewRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.reviewRequirementsService.findAll(
      params,
    );

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
    const serviceResponse = await this.reviewRequirementsService.findOne(id);

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
    @Body() payload: UpdateReviewRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.reviewRequirementsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Revisión de los requerimientos actualizada`,
      title: `Se ha Actualizado la revisión`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.reviewRequirementsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Revisión Eliminada`,
      title: `Revisión de los Requerimientos Eliminada`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ReviewRequirementEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.reviewRequirementsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Revisión Eliminada`,
      title: `Revisión de los Requerimientos Eliminado`,
    };
  }
}
