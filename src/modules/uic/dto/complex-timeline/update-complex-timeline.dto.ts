import { PartialType } from '@nestjs/swagger';
import { BaseComplexTimelineDto } from '@uic/dto';

export class UpdateComplexTimelineDto extends PartialType(
  BaseComplexTimelineDto,
) {}
