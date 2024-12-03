import { isBooleanValidationOptions } from '@shared/validation';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    Allow,
  } from 'class-validator';
  import {
    isNotEmptyValidationOptions,
    isStringValidationOptions,
  } from '@shared/validation';
import { ModalityEntity } from '@uic/entities';
import { IsOptional } from 'class-validator';
  
  export class BaseDownloadFormatDto {
  
  @Allow()
    readonly request: ModalityEntity;
    
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly name: string;
  
    @IsString()
    @IsOptional()
    readonly file: string;

  
  }
  