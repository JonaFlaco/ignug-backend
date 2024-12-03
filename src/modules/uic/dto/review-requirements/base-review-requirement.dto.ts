import { IsString, IsDate, IsOptional } from 'class-validator';
import { isStringValidationOptions } from '@shared/validation';
import { StatusEnum } from '../../enums';

export class BaseReviewRequirementDto {
  @IsDate()
  readonly registeredAt: Date;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly status: StatusEnum;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly file: string;
}
