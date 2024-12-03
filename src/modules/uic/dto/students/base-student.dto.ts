import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class BaseStudentDto {
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly career: string;

  @IsString(isStringValidationOptions())
  readonly ethnicity: string;

  @IsString(isStringValidationOptions())
  readonly email: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly cellphone: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly identification_card: number;
  //@IsDate(isDateValidationOptions)
  @IsString(isStringValidationOptions())
  readonly gender: string;
}
