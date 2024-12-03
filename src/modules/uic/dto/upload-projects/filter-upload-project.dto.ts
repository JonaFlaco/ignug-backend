
import { PaginationDto } from '@core/dto';
import {  IsOptional, IsString } from 'class-validator';

export class FilterUploadProjectDto extends PaginationDto {
  @IsOptional()
  @IsString()

  readonly theme: string;
 

}
