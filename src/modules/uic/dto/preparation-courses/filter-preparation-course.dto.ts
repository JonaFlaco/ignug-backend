import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterPreparationCourseDto extends PaginationDto {
  
  @IsOptional()
  @IsString()
  readonly name: string;
  
}
