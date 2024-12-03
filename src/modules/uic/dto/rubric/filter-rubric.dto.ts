
import { PaginationDto } from '@core/dto';
import {  IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterRubricDto extends PaginationDto {
  @IsOptional()
  @IsString()

  readonly name: string;
 
  // @IsUUID()
  // readonly career?: string;


}
