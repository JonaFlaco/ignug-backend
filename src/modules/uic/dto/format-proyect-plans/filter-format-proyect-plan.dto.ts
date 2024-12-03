import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterFormatProyectPlanDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly sort: number;
}
