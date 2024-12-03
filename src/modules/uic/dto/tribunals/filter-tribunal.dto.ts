import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterTribunalDto extends PaginationDto {
  @IsOptional()
  @IsString()
  // readonly student: string;
  readonly place: string;
}
