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

export class BaseMemorandumDto {
  @Allow()
  readonly nameTeacher: TeacherEntity;

  @Allow()
  readonly nameStudent: StudentEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly type: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly lab: string;

  @IsDate()
  readonly dateWritten: Date;

  @IsOptional()
  @IsDate()
  readonly dateApplication: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly time: string;
}
