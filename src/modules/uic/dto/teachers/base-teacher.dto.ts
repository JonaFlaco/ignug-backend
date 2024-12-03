import {
    IsNotEmpty,
    IsDate,
    IsString,
  } from 'class-validator';
  import {
    isNotEmptyValidationOptions,
    isStringValidationOptions,
  } from '@shared/validation';
  
  export class BaseTeacherDto {
  
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly dni: string;
  
    @IsNotEmpty(isNotEmptyValidationOptions())
     @IsString({ message: 'El campo tutor debe ser un string' })
    readonly tutor: string;
  
  }
  