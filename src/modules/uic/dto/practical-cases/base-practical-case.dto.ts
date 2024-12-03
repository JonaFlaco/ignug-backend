import '@uic/entities';
import { Allow, IsDate, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import { EstudianteEntity, StudentInformationEntity } from '@uic/entities';
import { TeacherEntity } from '@core/entities';

export class BasePracticalCaseDto {

  @IsString(isStringValidationOptions())
  readonly proyect: string;
 
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;
  
  @Allow()
  readonly student: StudentInformationEntity;

  @Allow()
  readonly teacher: TeacherEntity;
}
