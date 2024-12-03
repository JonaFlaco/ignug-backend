import { Exclude, Expose } from 'class-transformer';
import { BaseEvaluationDto } from '@uic/dto';

@Exclude()
export class ReadEvaluationDto extends BaseEvaluationDto {
  @Expose()
  readonly id;

  @Expose()
  readonly student;

  @Expose()
  readonly note;
}
