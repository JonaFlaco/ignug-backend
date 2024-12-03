import {
  IsDate,
  Allow,
  IsString,
} from 'class-validator';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import { StudentEntity } from '../../entities/student.entity';

export class BaseFormatProyectPlanDto {
  // @IsNotEmpty(isNotEmptyValidationOptions())
  // readonly event: EventEntity;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly career: string;

  @IsDate(isNotEmptyValidationOptions())
    readonly date: Date;

  @IsString(isStringValidationOptions())
    readonly research: string;

  @IsString(isStringValidationOptions())
    readonly theme: string;

    @IsString(isStringValidationOptions())
    readonly problem: string;

    @IsString(isStringValidationOptions())
    readonly justification: string;
    
    @IsString(isStringValidationOptions())
    readonly objective: string;

    @IsString(isStringValidationOptions())
    readonly objespecific: string;

    @IsString(isStringValidationOptions())
    readonly scopeeme: string;

    @IsString(isStringValidationOptions())
    readonly theorical: string;

    @IsString(isStringValidationOptions())
    readonly methodological: string;

    @IsString(isStringValidationOptions())
    readonly methodology: string;

    @IsString(isStringValidationOptions())
    readonly bibliography: string;

    @IsString(isStringValidationOptions())
    readonly budget: string;
}
