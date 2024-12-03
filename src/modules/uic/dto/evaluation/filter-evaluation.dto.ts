import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterEvaluationDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly note: number;
}
