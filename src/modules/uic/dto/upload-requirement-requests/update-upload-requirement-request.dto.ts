import { PartialType } from '@nestjs/swagger';
import { BaseUploadRequirementRequestDto } from '@uic/dto';

export class UpdateUploadRequirementRequestDto extends PartialType(
  BaseUploadRequirementRequestDto,
) {}
