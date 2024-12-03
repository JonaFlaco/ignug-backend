import { Exclude, Expose } from 'class-transformer';
import { BaseAttendanceRecordDto } from '@uic/dto';

@Exclude()
export class ReadAttendanceRecordDto extends BaseAttendanceRecordDto {
  @Expose()
  readonly id;

  @Expose()
  readonly namePlanning;

  @Expose()
  readonly nameModality;

  @Expose()
  readonly name;

  @Expose()
  readonly cedula;

  @Expose()
  readonly registeredAt;
}
