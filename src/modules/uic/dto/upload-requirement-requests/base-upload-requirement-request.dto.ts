import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlanningEntity } from '../../entities/planning.entity';

export class BaseUploadRequirementRequestDto {
  @Allow()
  readonly planning: PlanningEntity;

  @IsString()
  @IsOptional()
  readonly file: string;
}
