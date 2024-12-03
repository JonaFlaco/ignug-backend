// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   ParseUUIDPipe,
//   Patch,
//   Post,
//   Put,
//   Query,
// } from '@nestjs/common';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { ResponseHttpModel } from '@shared/models';
// import { TeachersService } from '@core/services';
// import {
//   CreateTeacherDto,
//   FilterTeacherDto,
//   UpdateTeacherDto,
// } from '@core/dto';
// import { TeacherEntity } from '@core/entities';

// @ApiTags('Teachers')
// @Controller('teachers')
// export class TeachersController {
//   constructor(private teacherService: TeachersService) {}

//   @ApiOperation({ summary: 'Create One' })
//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   async create(@Body() payload: CreateTeacherDto): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.create(payload);

//     return {
//       data: serviceResponse.data,
//       message: 'Teachear created',
//       title: 'Created',
//     };
//   }

//   @ApiOperation({ summary: 'Teachear' })
//   @Get('teachear')
//   @HttpCode(HttpStatus.OK)
//   async teachear(): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.catalogue();

//     return {
//       data: serviceResponse.data,
//       pagination: serviceResponse.pagination,
//       message: `teachear`,
//       title: `Teachear`,
//     };
//   }

//   @ApiOperation({ summary: 'Find All' })
//   @Get()
//   @HttpCode(HttpStatus.OK)
//   async findAll(@Query() params: FilterTeacherDto): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.findAll(params);

//     return {
//       data: serviceResponse.data,
//       pagination: serviceResponse.pagination,
//       message: `index`,
//       title: 'Success',
//     };
//   }

//   @ApiOperation({ summary: 'Find One' })
//   @Get(':id')
//   @HttpCode(HttpStatus.OK)
//   async findOne(
//     @Param('id', ParseUUIDPipe) id: string,
//   ): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.findOne(id);

//     return {
//       data: serviceResponse.data,
//       message: `show ${id}`,
//       title: `Success`,
//     };
//   }

//   @ApiOperation({ summary: 'Update One' })
//   @Put(':id')
//   @HttpCode(HttpStatus.CREATED)
//   async update(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body() payload: UpdateTeacherDto,
//   ): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.update(id, payload);

//     return {
//       data: serviceResponse.data,
//       message: `Teacher updated ${id}`,
//       title: `Updated`,
//     };
//   }

//   @ApiOperation({ summary: 'Remove One' })
//   @Delete(':id')
//   @HttpCode(HttpStatus.CREATED)
//   async remove(
//     @Param('id', ParseUUIDPipe) id: string,
//   ): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.remove(id);

//     return {
//       data: serviceResponse.data,
//       message: `Teacher deleted ${id}`,
//       title: `Deleted`,
//     };
//   }

//   @ApiOperation({ summary: 'Remove All' })
//   @Patch('remove-all')
//   @HttpCode(HttpStatus.CREATED)
//   async removeAll(
//     @Body() payload: TeacherEntity[],
//   ): Promise<ResponseHttpModel> {
//     const serviceResponse = await this.teacherService.removeAll(payload);

//     return {
//       data: serviceResponse.data,
//       message: `Teachers deleted`,
//       title: `Deleted`,
//     };
//   }
// }
