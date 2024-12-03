import { Exclude, Expose } from 'class-transformer';
import { BaseEvaluationDateDto } from '@uic/dto';
@Exclude()
export class ReadEvaluationDateDto extends BaseEvaluationDateDto {
  @Expose()
  readonly id;

  @Expose()
  readonly dni;

  @Expose()
  readonly tutor;

}
