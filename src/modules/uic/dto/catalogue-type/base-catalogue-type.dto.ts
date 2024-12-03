import

'@uic/entities';
import { IsString } from 'class-validator';
import {
  isStringValidationOptions,
} from '@shared/validation';

export class BaseCatalogueTypeDto {

  @IsString(isStringValidationOptions())
  readonly name: string;
  @IsString(isStringValidationOptions())
  readonly code: string;
}
