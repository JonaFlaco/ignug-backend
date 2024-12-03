import { Exclude, Expose } from 'class-transformer';
import { BaseEstudianteDto } from '@uic/dto';
@Exclude()
export class ReadEstudianteDto extends BaseEstudianteDto {
  @Expose()
  readonly id;

  @Expose()
  readonly dni;

  @Expose()
  readonly name;

  @Expose()
  readonly title;
  
@Expose()
readonly tutor;

  @Expose()
  readonly observations;


  @Expose()
  readonly revisionDate;

  @Expose()
  readonly state;
}
