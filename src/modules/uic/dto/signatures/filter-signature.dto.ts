import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterSignatureDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly signature: string;
}
