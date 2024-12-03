import { Allow, IsNotEmpty, IsPositive} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@shared/validation';
import { StudentEntity } from '@core/entities';

export class BaseNoteSettingDto {
  @Allow()
  readonly student: StudentEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isNumberValidationOptions())
  readonly evaluation: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isNumberValidationOptions())
  readonly document: number;
}
