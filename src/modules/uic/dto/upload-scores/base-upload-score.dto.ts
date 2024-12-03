import {
    IsNotEmpty,
    IsString,
    Allow,
    IsNumber,
  } from 'class-validator';
  import {
    isNotEmptyValidationOptions,
    isNumberValidationOptions,
    isStringValidationOptions,
  } from '@shared/validation';
import { CareerEntity } from '@core/entities';

  
  export class BaseUploadScoreDto {
  
    @Allow()
    readonly nameCareer: CareerEntity;  
    
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly name: string;
  
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly dni: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsNumber()
    readonly score: number;

  
  }
  