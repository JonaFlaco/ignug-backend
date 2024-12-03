import { Exclude, Expose } from 'class-transformer';
import { BaseFormatDto } from '@uic/dto';
@Exclude()
export class ReadFormatDto extends BaseFormatDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly file;

  @Expose()
  readonly state;

  @Expose()
  readonly description;

}
