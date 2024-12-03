import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';

export class BaseApprovalRequestDto {
  // @IsNotEmpty(isNotEmptyValidationOptions())
  // readonly event: EventEntity;

  @IsString(isStringValidationOptions())
    readonly name: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsPositive()
    readonly cide: number;

  @IsString(isStringValidationOptions())
    readonly teacher: string;

    @IsString(isStringValidationOptions())
    readonly career: string;

    @IsString(isStringValidationOptions())
    readonly period: string;
    
    @IsDate()
    readonly date: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsPositive()
    readonly cell: number;

    @IsString(isStringValidationOptions())
    readonly email: string;
}
