import { Exclude, Expose } from 'class-transformer';
import { BaseAssignamentDto } from '@uic/dto';
@Exclude()
export class ReadAssignamentDto extends BaseAssignamentDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly planning;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly sort;

  @Expose()
  readonly isEnable;
}
