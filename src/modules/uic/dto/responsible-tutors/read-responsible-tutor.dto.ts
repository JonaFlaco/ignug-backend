import { Exclude, Expose } from 'class-transformer';
import { BaseResponsibleTutorDto } from '@uic/dto';

@Exclude()
export class ReadResponsibleTutorDto extends BaseResponsibleTutorDto {
  
  @Expose()
  readonly id;

  @Expose()
  readonly observation;

  @Expose()
  readonly score;

  @Expose()
  readonly approved;

  @Expose()
  readonly nameStudent;

  @Expose()
  readonly date;
}
