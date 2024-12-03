import { Exclude, Expose } from 'class-transformer';
import { BaseStudentDegreeDto } from '@uic/dto';

@Exclude()
export class ReadStudentDegreeDto extends BaseStudentDegreeDto {
  @Expose()
  readonly id;

  @Expose()
  readonly nameEstudiante;

  @Expose()
  readonly nameModality;
  
  //@Expose()
  //readonly modalities;

  //@Expose()
  //readonly namePlanning;

  @Expose()
  readonly namePlanning;

  //@Expose()
  //readonly observations;

  @Expose()
  readonly title;

  @Expose()
  readonly observation;
  
  @Expose()
  readonly state;

  @Expose()
  readonly requerimientos;

  @Expose()
  readonly file;
  
  @Expose()
  readonly type_request;

  @Expose()
  readonly url;

  @Expose()
  readonly dni;

}
