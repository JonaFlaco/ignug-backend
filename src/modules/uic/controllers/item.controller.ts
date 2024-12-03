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
import { CreateItemDto, FilterItemDto, UpdateItemDto } from '@uic/dto';
import { ItemEntity } from '@uic/entities';
import { ItemsService } from '@uic/services';
  
  @ApiTags('Items')
  @Controller('items')
  export class ItemsController {
    constructor(private itemService: ItemsService) {}
  
    @ApiOperation({ summary: 'Create One' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateItemDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.itemService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Item Creada',
        title: 'Creado',
      };
    }
  
    @ApiOperation({ summary: 'Rubric' })
    @Get('item')
    @HttpCode(HttpStatus.OK)
    async teachear(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.itemService.catalogue();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Item`,
        title: `Item`,
      };
    }
  
    @ApiOperation({ summary: 'Find All' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterItemDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.itemService.findAll(params);
  
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
      const serviceResponse = await this.itemService.findOne(id);
  
      return {
        data: serviceResponse.data,
        message: `show`,
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Update One' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: UpdateItemDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.itemService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `Item Actualizada`,
        title: `Actualizar`,
      };
    }
  
    @ApiOperation({ summary: 'Remove One' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.itemService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `Item Eliminada`,
        title: `Eliminar`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: ItemEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.itemService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: `Items Eliminadas`,
        title: `Eliminados`,
      };
    }
  }
  