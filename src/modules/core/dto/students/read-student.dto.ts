import { Exclude, Expose } from 'class-transformer';
import { BaseStudentDto } from '@core/dto';

@Exclude()
export class ReadStudentDto extends BaseStudentDto {
  @Expose()
  readonly name;

  @Expose()
  readonly id;

  @Expose()
  readonly identification_card;

  @Expose()
  readonly career;

  @Expose()
  readonly user;
}
