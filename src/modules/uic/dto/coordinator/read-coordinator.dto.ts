import { Exclude, Expose } from 'class-transformer';
import { BaseCoordinatorDto } from './base-coordinator.dto';

@Exclude()
export class ReadCoordinatorDto extends BaseCoordinatorDto {
  @Expose()
  readonly id;

  @Expose()
  readonly title;

  @Expose()
  readonly description;

  @Expose()
  readonly actCode;

  @Expose()
  readonly approvedAt;

  @Expose()
  readonly assignedAt;

  @Expose()
  readonly tutorApprovedAt;

  @Expose()
  readonly observation;

  @Expose()
  readonly planning;

  @Expose()
  readonly state;
}
