import {
  Allow,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class BaseComplexScheduleDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly activity: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsDate(isNotEmptyValidationOptions())
  readonly endDate: Date;
  //@IsDate(isDateValidationOptions)
  @IsDate(isNotEmptyValidationOptions())
  readonly startDate: Date;

  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly sort: number;
}
