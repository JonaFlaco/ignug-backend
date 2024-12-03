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
import { NoteSettingsService } from '@uic/services';
import {
  CreateNoteSettingDto,
  FilterNoteSettingDto,
  UpdateNoteSettingDto,
} from '@uic/dto';
import { NoteSettingEntity } from '@uic/entities';

@ApiTags('NoteSettings')
@Controller('note-settings')
export class NoteSettingsController {
  constructor(private noteSettingsService: NoteSettingsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateNoteSettingDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteSettingsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Note Setting created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteSettingsService.catalogue();

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
    @Query() params: FilterNoteSettingDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteSettingsService.findAll(params);

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
    const serviceResponse = await this.noteSettingsService.findOne(id);

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
    @Body() payload: UpdateNoteSettingDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteSettingsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Note Setting updated ${id}`,
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
    const serviceResponse = await this.noteSettingsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Note Setting deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: NoteSettingEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.noteSettingsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `NoteSettings deleted`,
      title: `Deleted`,
    };
  }
}
