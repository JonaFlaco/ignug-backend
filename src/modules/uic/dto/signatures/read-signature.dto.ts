import { Exclude, Expose } from 'class-transformer';
import { BaseSignatureDto } from '@uic/dto';

@Exclude()
export class ReadSignatureDto extends BaseSignatureDto {
  @Expose()
  readonly id;

  @Expose()
  readonly hours;

  @Expose()
  readonly tutor;
  @Expose()
  readonly preparationCourse;

  @Expose()
  readonly signature;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;
}
