import {
  IsString,
  IsBoolean,
  Allow,
} from 'class-validator';
import {
  isStringValidationOptions,
  isBooleanValidationOptions,
} from '@shared/validation';
import { ModalityEntity, ProfessionEntity } from '@uic/entities';


export class BaseRequirementFormatDto {
  
  @Allow()
  readonly nameCareer:ProfessionEntity;
  
  @Allow()
  readonly nameModality:ModalityEntity;
  
  
  @IsString(isStringValidationOptions())
  readonly nameFormat: string;
  
  @IsBoolean(isBooleanValidationOptions())
  readonly requiredFormat: boolean;
  
  @IsString(isStringValidationOptions())
  readonly filename: string;


}
