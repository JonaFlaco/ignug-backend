import { Exclude, Expose } from 'class-transformer';
import { TeacherDto } from '@core/dto';
@Exclude()
export class ReadTeacherDto extends TeacherDto {

  @Expose()
  readonly career;

  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly user;

}
