import { Exclude, Expose } from 'class-transformer';
import { BaseComplexScheduleDto } from '@uic/dto';

@Exclude()
export class ReadComplexScheduleDto extends BaseComplexScheduleDto {
  @Expose()
  readonly id;

  @Expose()
  readonly activity;

  @Expose()
  readonly description;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly state;

  @Expose()
  readonly sort;
}
