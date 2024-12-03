import { Allow } from 'class-validator';
import {
  IsNotEmpty,
  IsDate,
  // Allow,
  // IsPositive,
  // IsBoolean,
  IsString,
  IsBoolean,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { TeacherEntity } from '@uic/entities';

export class BaseEstudianteDto {
  @Allow()
  readonly tutor: TeacherEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly revisionDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly dni: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly observations: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly title: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean ;
}
