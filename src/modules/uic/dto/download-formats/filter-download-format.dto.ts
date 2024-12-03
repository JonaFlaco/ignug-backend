
import { PaginationDto } from '@core/dto';
import {  IsOptional, IsString } from 'class-validator';

export class FilterDownloadFormatDto extends PaginationDto {
  @IsOptional()
  @IsString()

  readonly name: string;
 



}
