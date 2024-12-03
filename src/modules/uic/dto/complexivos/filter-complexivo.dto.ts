import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterComplexivoDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly nameCase: string;
}
