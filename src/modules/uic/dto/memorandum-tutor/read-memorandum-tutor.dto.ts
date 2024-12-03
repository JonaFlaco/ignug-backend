import { Exclude, Expose } from 'class-transformer';
import { BaseMemorandumTutorDto } from '@uic/dto';
@Exclude()
export class ReadMemorandumTutorDto extends BaseMemorandumTutorDto {
  @Expose()
  readonly id;

  @Expose()
  readonly type;

  @Expose()
  readonly nameTeacher;

  @Expose()
  readonly nameStudent;

  @Expose()
  readonly topic;

  @Expose()
  readonly dateWritten;
}
