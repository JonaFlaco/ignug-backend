import { Exclude, Expose } from 'class-transformer';
import { BaseItemDto } from '@uic/dto';
@Exclude()
export class ReadItemDto extends BaseItemDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly state;

  @Expose()
  readonly career;
}
