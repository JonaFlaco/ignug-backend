import { StudentEntity } from '@uic/entities';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPositive,
  IsDate,
  IsNumber,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { StatusEnum } from '../../enums';

export class BaseStudentInformationDto {
  //@IsNotEmpty(isNotEmptyValidationOptions())
  //readonly studentInformation: StudentInformationEntity;

  // @Allow()
  // readonly student: StudentEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isNumberValidationOptions())
  readonly cedula: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isNumberValidationOptions())
  readonly phone: number;

  @IsString(isStringValidationOptions())
  readonly genre: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly personalEmail: string;

  @IsString(isStringValidationOptions())
  readonly email: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly birthDate: Date;

  @IsString(isStringValidationOptions())
  readonly provinceBirth: string;

  @IsString(isStringValidationOptions())
  readonly cantonBirth: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly currentLocation: string;

  @IsString(isStringValidationOptions())
  readonly entryCohort: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly exitCohort: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly companyWork: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly companyArea: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly companyPosition: string;

  @IsString(isStringValidationOptions())
  readonly laborRelation: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly state: boolean;

  // @IsNotEmpty(isNotEmptyValidationOptions())
  // readonly status: StatusEnum;
}
