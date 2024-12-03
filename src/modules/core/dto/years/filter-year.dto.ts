import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterYearDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly year: string;
}
