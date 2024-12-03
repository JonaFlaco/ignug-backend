import { IsString, IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterPracticalCaseDto extends PaginationDto {
  
  @IsOptional()
  @IsString()
  readonly proyect: string;
  
  @IsOptional()
  @IsNumber()
  readonly sort: number;
}
