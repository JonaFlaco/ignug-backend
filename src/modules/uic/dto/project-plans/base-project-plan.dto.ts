import {
  IsString,
  IsNotEmpty,
  IsDate,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import {
  isStringValidationOptions,
  isNotEmptyValidationOptions,
} from '@shared/validation';

export class BaseProjectPlanDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly title: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  @MinLength(36)
  @MaxLength(36)
  studentId: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  @MinLength(36)
  @MaxLength(36)
  tutorId?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  @MinLength(36)
  @MaxLength(36)
  studentSelectId?: string;

  state?: string;

  readonly observation?: string;

  requestedAt: Date;

  readonly answeredAt?: Date;

  readonly requestFile?: any;

  readonly nameRequestFile?: string;

  readonly proyectPlanFile?: any;

  readonly nameProyectPlanFile?: string;

  //RelationShips

  tutor?: any;
  student?: any;
  studentSelect?: any;
}
