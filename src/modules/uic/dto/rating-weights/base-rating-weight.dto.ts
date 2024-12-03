import { IsNotEmpty, IsPositive } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseRatingWeightDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly weightOne: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive()
  readonly weightTwo: number;
}
