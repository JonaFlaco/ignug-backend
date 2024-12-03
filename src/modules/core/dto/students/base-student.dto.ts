import { UserEntity } from '@auth/entities';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { Allow, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { CareerEntity } from '../../entities/career.entity';

export class BaseStudentDto {
  @IsString(isStringValidationOptions())
  readonly name: string;

  @Allow()
  readonly career: CareerEntity;

  @Allow()
  readonly user: UserEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly identification_card: number;

  // @IsString(isStringValidationOptions())
  // readonly ethnicity: string;

  // @IsString(isStringValidationOptions())
  // readonly email: string;

  // @IsNotEmpty(isNotEmptyValidationOptions())
  // @IsPositive()
  // readonly cellphone: number;

  //@IsDate(isDateValidationOptions)
  //   @IsString(isStringValidationOptions())
  //   readonly gender: string;
}
