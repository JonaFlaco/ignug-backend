import {
  ModalityEntity,
  PlanningEntity,
  EstudianteEntity,
} from '@uic/entities';
import {
  IsString,
  IsBoolean,
  Allow,
} from 'class-validator';
import {
  isStringValidationOptions,
  isBooleanValidationOptions,
} from '@shared/validation';

export class BaseStudentDegreeDto {

  @Allow()
  readonly nameEstudiante: EstudianteEntity;

  @Allow()
  readonly nameModality: ModalityEntity;

  @Allow()
  readonly namePlanning: PlanningEntity;
  
  //@Allow()
  //readonly modalities: ModalityEntity;

  //@Allow()
  //readonly namePlanning: PlanningEntity;

  //@IsString(isStringValidationOptions())
  //readonly observations: string;
  
  @IsString(isStringValidationOptions())
    readonly title: string;

  @IsString(isStringValidationOptions())
    readonly observation: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

  @IsString(isStringValidationOptions())
  readonly requerimientos: string;

  @IsString(isStringValidationOptions())
  readonly file: string;

  @IsString(isStringValidationOptions())
    readonly type_request: string;

  @IsString(isStringValidationOptions())
    readonly url: string;

  @IsString(isStringValidationOptions())
    readonly dni: string;  

}
