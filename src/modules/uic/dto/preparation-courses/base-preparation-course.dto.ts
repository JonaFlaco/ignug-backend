import '@uic/entities';
import { Allow, IsDate, IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { CareerEntity, YearEntity } from '@core/entities';
import { PlanningEntity } from '@uic/entities';

export class BasePreparationCourseDto {
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @Allow()
  readonly year: YearEntity;

  @Allow()
  readonly career: CareerEntity;

  @Allow()
  readonly planningName: PlanningEntity;
}
