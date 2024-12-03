
import {Allow} from 'class-validator';
import {
  isStringValidationOptions,
} from '@shared/validation';
import { 
  EstudianteEntity, 
  ModalityEntity,
   ProjectEntity,
   StudentInformationEntity,
   TeacherEntity,
   UploadProjectEntity,  
  } from '@uic/entities';

export class BaseTutorAssignmentDto {
  @Allow()
  readonly uploadProject: UploadProjectEntity;

  @Allow()
  readonly teacher: TeacherEntity;

  @Allow()
  readonly student: StudentInformationEntity;
  

}
