import {
  IsNotEmpty,
  IsDate,
  IsString,
  Allow,
  IsNumber,
  Max,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { isBooleanValidationOptions, isNotEmptyValidationOptions, isNumberValidationOptions, isStringValidationOptions } from '@shared/validation';
import { Min } from 'class-validator';
import { ProjectBenchEntity, StudentInformationEntity } from '@uic/entities';

export class BaseNoteDto {

  @Allow()
  readonly studentInformation: StudentInformationEntity;

  @Allow()
  readonly projectBench: ProjectBenchEntity;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly score: number;


  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly score2: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly score3: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly score4: number;

  @IsString(isStringValidationOptions())
  readonly observation: string;
  
  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

}
