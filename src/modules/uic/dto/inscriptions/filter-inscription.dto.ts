import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterInscriptionDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly student: string;

  @IsOptional()
  @IsString()
  readonly observation: string;
}
