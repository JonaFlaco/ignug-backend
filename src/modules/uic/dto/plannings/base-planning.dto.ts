import { IsString, Allow, IsDate, IsBoolean } from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { ModalityEntity, ProfessionEntity } from '@uic/entities';
import { CareerEntity, YearEntity } from '@core/entities';

export class BasePlanningDto {
  @Allow()
  readonly nameModality: ModalityEntity;

  @Allow()
  readonly career: CareerEntity;

  @Allow()
  readonly profession: ProfessionEntity;

  @Allow()
  readonly year: YearEntity;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsDate(isNotEmptyValidationOptions())
  readonly endDate: Date;
  //@IsDate(isDateValidationOptions)
  @IsDate(isNotEmptyValidationOptions())
  readonly startDate: Date;
  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;
}
