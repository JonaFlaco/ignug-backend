import { Exclude, Expose } from 'class-transformer';
import { BaseSignatureDto } from '@core/dto';

@Exclude()
export class ReadSignatureDto extends BaseSignatureDto {
  @Expose()
  readonly id;


  @Expose()
  readonly name;

  @Expose()
  readonly code;

  @Expose()
  readonly description;
  @Expose()
  readonly state;
}
