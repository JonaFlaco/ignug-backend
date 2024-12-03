import { PartialType } from '@nestjs/swagger';
import { BaseScheduleActivityDto } from '@uic/dto';

export class UpdateScheduleActivityDto extends PartialType(
  BaseScheduleActivityDto,
) {}
