import { isNotEmptyValidationOptions } from '@shared/validation';
import { Allow, IsNotEmpty, IsPositive } from 'class-validator';
import { EstudianteEntity } from '../../entities/estudiante.entity';

export class BaseEvaluationDto {
  @Allow()
  readonly student: EstudianteEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly note: number;
}
