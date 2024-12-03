import { Exclude, Expose } from 'class-transformer';
import { BasePreparationCourseDto } from '@uic/dto';

@Exclude()
export class ReadPreparationCourseDto extends BasePreparationCourseDto {
  
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly description;

  @Expose()
  readonly year;

  @Expose()
  readonly career;

  @Expose()
  readonly planningName;
}
