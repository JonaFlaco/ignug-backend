import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class BaseScheduleActivityDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly assignment: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;

  //@IsDate(isDateValidationOptions)
  @IsDate(isNotEmptyValidationOptions())
  readonly startDate: Date;

  @IsDate(isNotEmptyValidationOptions())
  readonly endDate: Date;

  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;
}
