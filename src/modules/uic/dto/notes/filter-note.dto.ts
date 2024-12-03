import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterNoteDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly score: number;
}
