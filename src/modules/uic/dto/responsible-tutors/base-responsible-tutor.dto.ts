import {
  IsString,
  Allow,
  IsDate,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { EstudianteEntity, EventEntity } from '@uic/entities';

export class BaseResponsibleTutorDto {
  @Allow()
  readonly nameStudent: EstudianteEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly date: Date;

  @IsString(isStringValidationOptions())  
  readonly observation: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly approved: boolean;

  @IsNumber()  
  readonly score: number;

}
