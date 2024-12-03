import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { IsString, IsBoolean, Allow, IsNotEmpty, IsOptional } from 'class-validator';
import { PlanningEntity } from '../../entities/planning.entity';
import { CatalogueEntity } from '@uic/entities';
import { StatusEnum } from '../../enums';
export class BaseRequirementDto {
  // @IsBoolean(isBooleanValidationOptions())
  // readonly required: boolean;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly description: string;

  @Allow()
  readonly planning: PlanningEntity;

  @Allow()
  readonly nameCatalogue: CatalogueEntity;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly status: StatusEnum;
}
