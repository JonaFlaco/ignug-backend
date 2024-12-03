import { IsOptional } from 'class-validator';
import {} from '@uic/entities';
import {
  IsString,
  Allow,
  IsNotEmpty,
  IsDate,
  IsBoolean,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
} from '@shared/validation';
import { StudentEntity } from '@core/entities';

export class BaseEnrollmentDto {
  @Allow()
  readonly student: StudentEntity;

  @IsString(isStringValidationOptions())
  readonly state: string;

  //@IsBoolean(isBooleanValidationOptions())
  @IsOptional()
  readonly stateM: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly code: string;

  @IsString(isStringValidationOptions())
  readonly observation: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly registeredAt: Date;
}
