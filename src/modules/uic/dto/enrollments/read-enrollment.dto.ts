import { Exclude, Expose } from 'class-transformer';
import { BaseEnrollmentDto } from '@uic/dto';

@Exclude()
export class ReadEnrollmentDto extends BaseEnrollmentDto {
  @Expose()
  readonly id;

  @Expose()
  readonly code;

  @Expose()
  readonly observation;

  @Expose()
  readonly student;

  @Expose()
  readonly state;

  @Expose()
  readonly stateM;

  @Expose()
  readonly registeredAt;
}
