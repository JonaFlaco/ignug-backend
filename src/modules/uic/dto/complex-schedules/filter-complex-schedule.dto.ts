import { IsString, IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterComplexScheduleDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly activity: string;

  @IsOptional()
  @IsNumber()
  readonly sort: number;
}
