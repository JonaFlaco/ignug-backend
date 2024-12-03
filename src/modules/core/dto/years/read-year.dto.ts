import { Exclude, Expose } from 'class-transformer';
import { BaseYearDto } from '@core/dto';

@Exclude()
export class ReadYearDto extends BaseYearDto {
  @Expose()
  readonly id;

  // @Expose()
  // readonly code;

  @Expose()
  readonly year;

  // @Expose()
  // readonly state;

  // @Expose()
  // readonly modality;

  // @Expose()
  // readonly planning;

  // @Expose()
  // readonly registeredAt;
}
