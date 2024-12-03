import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterAssignamentDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly sort: number;
}
