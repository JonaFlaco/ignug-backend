import { IsNotEmpty, IsDate, IsString, Allow } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { UploadProjectEntity } from '@uic/entities';

export class BaseCourtProjectDto {
  @Allow()
  readonly proyect: UploadProjectEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString({ message: 'El campo tribunal debe ser un string' })
  readonly tribunal: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString({ message: 'El campo description debe ser un string' })
  readonly description: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString({ message: 'El campo place debe ser un string' })
  readonly place: string;

  @IsDate(isNotEmptyValidationOptions())
  readonly defenseAt: Date;
}
