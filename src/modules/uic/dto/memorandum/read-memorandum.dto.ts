import { Exclude, Expose } from 'class-transformer';
import { BaseMemorandumDto } from '@uic/dto';
@Exclude()
export class ReadMemorandumDto extends BaseMemorandumDto {
  @Expose()
  readonly id;

  @Expose()
  readonly type;

  @Expose()
  readonly nameTeacher;

  @Expose()
  readonly nameStudent;

  @Expose()
  readonly lab;

  @Expose()
  readonly dateWritten;

  @Expose()
  readonly dateApplication;

  @Expose()
  readonly time;
}
