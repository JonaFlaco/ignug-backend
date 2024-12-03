import { IsString, IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterResponsibleTutorDto extends PaginationDto {
  
  @IsOptional()
  @IsString() 
  readonly nameStudent: string;
  
}
