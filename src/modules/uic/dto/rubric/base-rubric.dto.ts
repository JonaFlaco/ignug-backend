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
import { CareerEntity, StudentEntity } from '@core/entities';
import { ItemEntity } from '../../entities/item.entity';
  
  export class BaseRubricDto {
    
    @IsNotEmpty(isNotEmptyValidationOptions())
    readonly item: any;


    @Allow()
    readonly career: CareerEntity;
  
    @IsNotEmpty(isNotEmptyValidationOptions())
     @IsString({ message: 'El campo criterio debe ser un string' })
    readonly criterio: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString({ message: 'El campo criterio debe ser un string' })
   readonly criterio2: string;

   @IsNotEmpty(isNotEmptyValidationOptions())
   @IsString({ message: 'El campo criterio debe ser un string' })
  readonly criterio3: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString({ message: 'El campo criterio debe ser un string' })
 readonly criterio4: string;

 @IsNotEmpty(isNotEmptyValidationOptions())
 @IsString({ message: 'El campo criterio debe ser un string' })
readonly criterio5: string;

 @Allow()
  readonly nameStudent: StudentEntity;

}
  