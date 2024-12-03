import { Exclude, Expose } from 'class-transformer';
import { BaseRegisterDto } from '@uic/dto';

@Exclude()
export class ReadRegisterDto extends BaseRegisterDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly hours;

  @Expose()
  readonly date;
}
