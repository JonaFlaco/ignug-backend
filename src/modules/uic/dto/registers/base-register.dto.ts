import // CatalogueEntity,
// ModalityEntity,
// PlanningEntity,

'@uic/entities';
import {
  IsString,
  Allow,
  IsNotEmpty,
  IsPositive,
  IsDate,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { TeacherEntity } from '@uic/entities';

export class BaseRegisterDto {
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly hours: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly date: Date;
}
