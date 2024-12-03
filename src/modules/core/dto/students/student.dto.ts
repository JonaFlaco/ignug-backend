import { isNotEmptyValidationOptions } from '@shared/validation';
import {
  Allow,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { CareerEntity } from '../../entities/career.entity';

export class StudentDto {
  @IsString({ message: 'El campo debe ser de tipo string' })
  name: string;

  @IsNumber({}, { message: 'El campo userId debe ser un numero' })
  @IsPositive({ message: 'El campo userId debe ser un entero positivo' })
  userid: string;

  @IsNumber({}, { message: 'studentId Tiene que ser de tipo numero' })
  @IsPositive({ message: 'studentId debe ser un entero positivo' })
  studentid: string;

  @Allow()
  readonly career: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly identification_card: number;
}
