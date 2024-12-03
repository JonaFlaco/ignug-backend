import { Exclude, Expose } from 'class-transformer';
import { BaseIndividualDefenseDto } from '@uic/dto';
@Exclude()
export class ReadIndividualDefenseDto extends BaseIndividualDefenseDto {
  @Expose()
  readonly id;

  @Expose()
  readonly noteOne;

  @Expose()
  readonly noteTwo;

  @Expose()
  readonly finalNote;
}
