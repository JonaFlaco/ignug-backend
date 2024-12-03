import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterMemorandumTutorDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly type: string;
}
