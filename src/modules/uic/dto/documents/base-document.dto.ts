import { UploadRequirementRequestEntity } from '@uic/entities';
import { YearEntity } from '@core/entities';
import { IsString, Allow } from 'class-validator';
import { isStringValidationOptions } from '@shared/validation';

export class BaseDocumentDto {
  @IsString(isStringValidationOptions())
  readonly observation: string;

  @Allow()
  readonly year: YearEntity;

  @Allow()
  readonly estudiante: UploadRequirementRequestEntity;

  @Allow()
  readonly cedula: UploadRequirementRequestEntity;
}
