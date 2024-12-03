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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators';
import {
  CreateRequirementFormatDto,
  FilterRequirementFormatDto,
  UpdateRequirementFormatDto,
} from '@uic/dto';
import { RequirementFormatEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequirementFormatsService } from '@uic/services';

@ApiTags('requirement-formats')
@Controller('requirement-formats')
export class RequirementFormatsController {
  constructor(private requirementFormatsService: RequirementFormatsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateRequirementFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementFormatsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'RequirementFormat created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementFormatsService.catalogue();

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
    @Query() params: FilterRequirementFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementFormatsService.findAll(
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
    const serviceResponse = await this.requirementFormatsService.findOne(id);

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
    @Body() payload: UpdateRequirementFormatDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementFormatsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `RequirementFormat updated ${id}`,
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
    const serviceResponse = await this.requirementFormatsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `RequirementFormat deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: RequirementFormatEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementFormatsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `RequirementFormats deleted`,
      title: `Deleted`,
    };
  }
  @ApiOperation({ summary: 'Upload and store the file' })
  // @Auth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseHttpModel> {
    // const serviceResponse = await this.requirementFormatsService.upload(file);

    console.log(file);
    return {
      data: true,
      message: 'RequirementFormat uploaded',
      title: 'Uploaded',
    };
  }
}
