import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterTeacherDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
