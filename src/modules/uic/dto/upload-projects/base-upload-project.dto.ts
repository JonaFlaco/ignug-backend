import { IsNotEmpty, IsString, Allow, IsNumber } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { CareerEntity } from '@core/entities';

export class BaseUploadProjectDto {
  @Allow()
  readonly nameCareer: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly theme: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly members: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly summary: string;
}
