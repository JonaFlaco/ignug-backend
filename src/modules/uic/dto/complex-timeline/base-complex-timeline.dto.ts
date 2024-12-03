import { Allow, IsDate, IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';
import { UploadProjectEntity } from '@uic/entities';

export class BaseComplexTimelineDto {
  @Allow()
  readonly topicProject: UploadProjectEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly activity: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly meetingDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;
}
