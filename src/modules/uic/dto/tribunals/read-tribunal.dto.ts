import { Exclude, Expose } from 'class-transformer';
import { BaseTribunalDto } from '@uic/dto';
@Exclude()
export class ReadTribunalDto extends BaseTribunalDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly president;

  @Expose()
  readonly tutor;

  @Expose()
  readonly vocal;


  @Expose()
  readonly date;


  @Expose()
  readonly score;

  @Expose()
  readonly score2;

  @Expose()
  readonly score3;

  @Expose()
  readonly place;


}
