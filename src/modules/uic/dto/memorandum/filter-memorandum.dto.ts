import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterMemorandumDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly type: string;
}
