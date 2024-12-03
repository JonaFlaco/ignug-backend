import { PaginationDto } from '@core/dto';
import { isStringValidationOptions } from '@shared/validation';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterStudentInformationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly cedula: number;
}
