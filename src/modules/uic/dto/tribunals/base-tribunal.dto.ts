import {
  IsNotEmpty,
  IsDate,
  IsString,
  Allow,
  IsNumber,
  Max,
  IsInt,
} from 'class-validator';
import { isNotEmptyValidationOptions, isNumberValidationOptions } from '@shared/validation';
import { EstudianteEntity, TeacherEntity } from '@uic/entities';
import { Min } from 'class-validator';

export class BaseTribunalDto {

  @Allow()
  readonly name: EstudianteEntity;

  @Allow()
  readonly president: TeacherEntity;
  
  @Allow()
  readonly tutor: TeacherEntity;

  @Allow()
  readonly vocal: TeacherEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  readonly score: number;


  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  readonly score2: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  readonly score3: number;

 
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly date: Date;


  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString({ message: 'El campo place debe ser un string' })
  readonly place: string;


}
