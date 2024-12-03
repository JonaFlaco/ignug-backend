
import { PaginationDto } from '@core/dto';
import {  IsOptional, IsString } from 'class-validator';

export class FilterTeacherDto extends PaginationDto {
  @IsOptional()
  @IsString()

  readonly dni: string;
 



}
