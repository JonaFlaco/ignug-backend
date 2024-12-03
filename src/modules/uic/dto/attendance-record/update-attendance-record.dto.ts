import { PartialType } from '@nestjs/swagger';
import { BaseAttendanceRecordDto } from '@uic/dto';

export class UpdateAttendanceRecordDto extends PartialType(
  BaseAttendanceRecordDto,
) {}
