import { Exclude, Expose } from 'class-transformer';
import { BaseProjectPlanDto } from '@uic/dto';

@Exclude()
export class ReadProjectPlanDto extends BaseProjectPlanDto {
  @Expose()
  readonly id;

  @Expose()
  readonly title;

  @Expose()
  readonly student;

  @Expose()
  readonly tutor;

  @Expose()
  readonly studentSelect;

  @Expose()
  readonly state;

  @Expose()
  readonly observation;

  @Expose()
  readonly assignedAt;

  @Expose()
  readonly answeredAt;

  @Expose()
  readonly requestedAt;

  @Expose()
  readonly proyectPlanFile;

  @Expose()
  readonly nameProyectPlanFile;

  @Expose()
  readonly nameRequestFile;

  @Expose()
  readonly requestFile;
}
