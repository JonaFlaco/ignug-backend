import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  Allow,
  IsOptional,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { StudentInformationEntity } from '@uic/entities';
import { StatusEnum } from '../../enums';

export class BaseInscriptionDto {
  @Allow()
  readonly studentInformation: StudentInformationEntity;

  @IsString(isStringValidationOptions())
  readonly student: string;

  @IsString(isStringValidationOptions())
  readonly dni: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly isEnable: boolean;

  @IsString(isStringValidationOptions())
  readonly document: string;

  @IsString(isStringValidationOptions())
  readonly requirement: string;

  @IsString(isStringValidationOptions())
  readonly request: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly docUpload: boolean;

  @IsString(isStringValidationOptions())
  readonly modality: string;

  @IsString(isStringValidationOptions())
  readonly observation: string;

  @IsString(isStringValidationOptions())
  readonly status: string;
}
