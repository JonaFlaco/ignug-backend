import '@core/entities';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class BaseSignatureDto {

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly code: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;
}
