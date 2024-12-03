import { Allow, IsBoolean, IsNotEmpty, IsString} from 'class-validator';
import { isBooleanValidationOptions } from '@shared/validation';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,

} from '@shared/validation';
import { CatalogueTypeEntity, RequirementEntity } from '@uic/entities';

export class BaseCatalogueDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

  @Allow()
  readonly catalogueType: CatalogueTypeEntity;

}
