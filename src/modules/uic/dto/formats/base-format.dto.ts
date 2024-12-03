import { isBooleanValidationOptions } from '@shared/validation';
import { IsOptional } from 'class-validator';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class BaseFormatDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly file: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;
}
