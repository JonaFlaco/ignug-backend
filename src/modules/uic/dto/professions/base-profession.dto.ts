import

'@uic/entities';
import { IsString } from 'class-validator';
import {
  isStringValidationOptions,
} from '@shared/validation';

export class BaseProfessionDto {

  @IsString(isStringValidationOptions())
  readonly career: string;

}
