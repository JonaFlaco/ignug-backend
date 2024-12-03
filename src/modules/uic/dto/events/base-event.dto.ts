import { CatalogueEntity, PlanningEntity } from '@uic/entities';
import {
  IsNotEmpty,
  IsDate,
  Allow,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseEventDto {

  @Allow()
  readonly catalogue: CatalogueEntity;

  @Allow()
  readonly planning: PlanningEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly sort: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly isEnable: boolean;
}
