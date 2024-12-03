import { IsNotEmpty, IsString, IsPositive, Allow } from 'class-validator';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@shared/validation';
import { RubricEntity } from '@uic/entities';
import { StudentEntity, TeacherEntity } from '@core/entities';

export class BaseRubricNoteDto {
  @Allow()
  readonly rubric: RubricEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isNumberValidationOptions())
  readonly note: number;

  @Allow()
  readonly teacher: TeacherEntity;

  @Allow()
  readonly student: StudentEntity;
  
}
