import { Exclude, Expose } from 'class-transformer';
import { BaseReviewRequirementDto } from '@uic/dto';
import { StatusEnum } from '../../enums';

@Exclude()
export class ReadReviewRequirementDto extends BaseReviewRequirementDto {
  @Expose()
  readonly id;

  @Expose()
  readonly registeredAt;

  @Expose()
  readonly status: StatusEnum;

  @Expose()
  readonly description;

  @Expose()
  readonly file;
}
