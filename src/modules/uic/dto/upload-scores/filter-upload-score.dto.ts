
import { PaginationDto } from '@core/dto';
import {  IsOptional, IsString } from 'class-validator';

export class FilterUploadScoreDto extends PaginationDto {
  @IsOptional()
  @IsString()

  readonly name: string;
 

}
