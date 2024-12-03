import { PartialType } from '@nestjs/swagger';
import { BaseReviewRequirementDto } from '@uic/dto';

export class UpdateReviewRequirementDto extends PartialType(
  BaseReviewRequirementDto,
) {}
