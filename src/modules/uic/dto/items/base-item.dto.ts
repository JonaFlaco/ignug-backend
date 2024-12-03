import {
  Allow,
    IsBoolean,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  import {
    isBooleanValidationOptions,
    isNotEmptyValidationOptions,
    isStringValidationOptions,
  } from '@shared/validation';
import { CareerEntity } from '@core/entities';

  
  export class BaseItemDto {
  
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly name: string;
  
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsBoolean(isBooleanValidationOptions())
    readonly state: boolean;
  
    @Allow()
    readonly career: CareerEntity;
  }
  
  