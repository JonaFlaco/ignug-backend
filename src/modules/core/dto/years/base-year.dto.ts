import // CatalogueEntity,
// ModalityEntity,
// PlanningEntity,

'@uic/entities';
import { IsString, Allow, IsNotEmpty } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class BaseYearDto {
  // @Allow()
  // readonly modality : ModalityEntity;

  // @Allow()
  // readonly planning : PlanningEntity;

  // @Allow()
  // readonly stateId : CatalogueEntity;

  // @IsNotEmpty(isNotEmptyValidationOptions())
  // @IsString( isStringValidationOptions() )
  // readonly code: string;

  @IsString(isStringValidationOptions())
  readonly year: string;

  // @IsString(isStringValidationOptions())
  // readonly state: string;

  // @IsNotEmpty(isNotEmptyValidationOptions())
  // @IsDate()
  // readonly registeredAt: Date;
}
