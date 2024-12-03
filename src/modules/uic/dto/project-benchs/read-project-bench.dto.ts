import { Exclude, Expose } from 'class-transformer';
import { BaseProjectBenchDto } from '@uic/dto';

@Exclude()
export class ReadProjectBenchDto extends BaseProjectBenchDto {
  @Expose()
  readonly id;

  @Expose()
  readonly teacher;

  @Expose()
  readonly title;

  @Expose()
  readonly name;

  @Expose()
  readonly description;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly state;
}
