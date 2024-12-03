import { PaginationDto } from '@core/dto';
import { isStringValidationOptions } from '@shared/validation';
import { IsOptional, IsString } from 'class-validator';

export class FilterProjectBenchDto extends PaginationDto {

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly name: string;
}
