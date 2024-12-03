import { Exclude, Expose } from 'class-transformer';
import { BaseTeacherDto } from '@uic/dto';
@Exclude()
export class ReadTeacherDto extends BaseTeacherDto {
  @Expose()
  readonly id;

  @Expose()
  readonly dni;

  @Expose()
  readonly tutor;

}
