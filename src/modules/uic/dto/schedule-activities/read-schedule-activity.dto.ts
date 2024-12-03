import { Exclude, Expose } from 'class-transformer';
import { BaseScheduleActivityDto } from '@uic/dto';

@Exclude()
export class ReadScheduleActivityDto extends BaseScheduleActivityDto {
  @Expose()
  readonly id;

  @Expose()
  readonly assignment;

  @Expose()
  readonly description;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly state;
}
