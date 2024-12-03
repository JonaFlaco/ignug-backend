import { PaginationDto } from '@core/dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class FilterCourtProjectDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly proyect: string;

  @IsOptional()
  @IsString()
  readonly place: string;

  @IsOptional()
  @IsDate()
  readonly defenseAt: Date;
}
