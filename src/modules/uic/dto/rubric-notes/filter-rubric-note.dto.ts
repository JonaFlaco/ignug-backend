import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterRubricNoteDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly rubric: string;

  @IsOptional()
  readonly userId: string;

  @IsOptional()
  @IsString()
  readonly note: string;

  // @IsOptional()
  // @IsNumber()
  // readonly note: number;
}
