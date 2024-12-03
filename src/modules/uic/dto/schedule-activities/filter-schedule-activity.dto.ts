import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterScheduleActivityDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly assignment: string;
}
