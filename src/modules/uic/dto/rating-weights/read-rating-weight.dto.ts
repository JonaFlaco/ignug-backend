import { Exclude, Expose } from 'class-transformer';
import { BaseRatingWeightDto } from '@uic/dto';
@Exclude()
export class ReadRatingWeightDto extends BaseRatingWeightDto {
  @Expose()
  readonly id;

  @Expose()
  readonly weightOne;

  @Expose()
  readonly weightTwo;
}
