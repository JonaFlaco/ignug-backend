import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterCoordinatorDto extends PaginationDto {
  @IsString()
  @IsOptional()
  readonly title: string;
}
