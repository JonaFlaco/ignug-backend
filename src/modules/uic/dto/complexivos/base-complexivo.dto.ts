import {
  IsString,
  Allow,
} from 'class-validator';
import { isStringValidationOptions } from '@shared/validation';
import { EstudianteEntity, TeacherEntity } from '@uic/entities';

export class BaseComplexivoDto {

  @Allow()
  readonly name: EstudianteEntity;

  @Allow()
  readonly name2: EstudianteEntity;

  @Allow()
  readonly president: TeacherEntity;
  
  @Allow()
  readonly tutor: TeacherEntity;

  @Allow()
  readonly vocal: TeacherEntity;

  @IsString(isStringValidationOptions())
  readonly nameCase: string;
}
