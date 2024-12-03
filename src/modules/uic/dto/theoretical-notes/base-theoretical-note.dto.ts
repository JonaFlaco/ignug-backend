import { IsNotEmpty, IsString, IsPositive, Allow } from 'class-validator';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@shared/validation';

export class BaseTheoricalNoteDto {
  @Allow()
  readonly name: EnrollmentEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isNumberValidationOptions())
  readonly note: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString({ message: 'El campo observations debe ser un string' })
  readonly observations: string;
}
