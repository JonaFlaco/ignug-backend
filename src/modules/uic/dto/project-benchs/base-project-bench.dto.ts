import { CatalogueEntity } from '@uic/entities';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import {
  Allow,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { TeacherEntity } from '@core/entities';

export class BaseProjectBenchDto {

  @Allow()
  readonly teacher: TeacherEntity;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly title: string;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsDate(isNotEmptyValidationOptions())
  readonly startDate: Date;

  @IsDate(isNotEmptyValidationOptions())
  readonly endDate: Date;

  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;
}
