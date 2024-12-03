import { Exclude, Expose } from 'class-transformer';
import { BaseRubricDto } from '@uic/dto';
@Exclude()
export class ReadRubricDto extends BaseRubricDto {
  @Expose()
  readonly id;

  @Expose()
  readonly item;

  @Expose()
  readonly career;

  @Expose()
  readonly criterio;

  @Expose()
  readonly criterio2;

  @Expose()
  readonly criterio3;

  @Expose()
  readonly criterio4;

  @Expose()
  readonly criterio5;

  @Expose()
  readonly nameStudent;

 

}
