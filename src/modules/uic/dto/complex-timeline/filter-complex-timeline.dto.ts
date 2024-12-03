import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterComplexTimelineDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly activity: string;
}
