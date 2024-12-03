import { Exclude, Expose } from 'class-transformer';
import { BaseComplexivoDto } from '@uic/dto';
@Exclude()
export class ReadComplexivoDto extends BaseComplexivoDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly name2;

  @Expose()
  readonly president;

  @Expose()
  readonly tutor;

  @Expose()
  readonly vocal;

  @Expose()
  readonly nameCase;

}
