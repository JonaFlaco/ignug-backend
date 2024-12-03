import { IsString, IsNotEmpty } from 'class-validator';
import {
  isStringValidationOptions,
  isNotEmptyValidationOptions,
} from '@shared/validation';

export class BaseResponseProjectPlanDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly observation: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly tutor: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly state: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly idProyectPlan: string;
}
