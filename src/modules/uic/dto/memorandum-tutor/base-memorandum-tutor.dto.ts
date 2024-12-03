import {
  Allow,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { StudentEntity, TeacherEntity } from '@core/entities';
import { PracticalCaseEntity } from '../../entities/practical-case.entity';

export class BaseMemorandumTutorDto {
  @Allow()
  readonly nameTeacher: TeacherEntity;

  @Allow()
  readonly nameStudent: StudentEntity;

  @Allow()
  readonly topic: PracticalCaseEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly type: string;

  @IsDate()
  readonly dateWritten: Date;
}
