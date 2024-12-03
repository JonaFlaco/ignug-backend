import { Exclude, Expose } from 'class-transformer';
import { BaseResponseProjectPlanDto } from './base-response-project-plan.dto';

@Exclude()
export class ReadResponseProjectPlanDto extends BaseResponseProjectPlanDto {
  @Expose()
  readonly id;

  @Expose()
  readonly observation;

  @Expose()
  readonly tutor;

  @Expose()
  readonly state;
}
