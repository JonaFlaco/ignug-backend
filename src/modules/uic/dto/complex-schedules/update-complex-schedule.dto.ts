import { PartialType } from '@nestjs/swagger';
import { BaseComplexScheduleDto } from '@uic/dto';

export class UpdateComplexScheduleDto extends PartialType(
  BaseComplexScheduleDto,
) {}
