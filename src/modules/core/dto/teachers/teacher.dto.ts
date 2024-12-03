import { CareerEntity } from '@core/entities';
import { Allow, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class TeacherDto {
  @IsString({ message: 'El campo debe ser de tipo string' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'El campo userId debe ser un numero' })
  @IsPositive({ message: 'El campo userId debe ser un entero positivo' })
  userid: string;

  @IsOptional()
  @IsNumber({}, { message: 'studentId Tiene que ser de tipo numero' })
  @IsPositive({ message: 'studentId debe ser un entero positivo' })
  studentid: string;


  @Allow()
  readonly career: CareerEntity;
}
