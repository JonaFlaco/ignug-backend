

'@uic/entities';
import { IsString, Allow, IsNotEmpty, IsPositive, IsDate } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { PreparationCourseEntity } from '@uic/entities';
import { SignatureCatEntity, TeacherEntity } from '@core/entities';

export class BaseSignatureDto {
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly hours: number;

  @Allow()
  readonly tutor: TeacherEntity;

  @Allow()
  readonly preparationCourse: PreparationCourseEntity;

  @Allow()
  readonly signature: SignatureCatEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;

}
