import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterEstudianteDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly dni: string;
}
