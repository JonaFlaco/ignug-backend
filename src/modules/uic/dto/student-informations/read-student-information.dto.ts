import { Exclude, Expose } from 'class-transformer';
import { BaseStudentInformationDto } from './base-student-information.dto';
@Exclude()
export class ReadStudentInformationDto extends BaseStudentInformationDto {
  // @Expose()
  // readonly student;

  @Expose()
  readonly id;
  @Expose()
  readonly cedula;
  @Expose()
  readonly name;
  @Expose()
  readonly phone;
  @Expose()
  readonly genre;
  @Expose()
  readonly personalEmail;
  @Expose()
  readonly email;
  @Expose()
  readonly birthDate;
  @Expose()
  readonly provinceBirth;
  @Expose()
  readonly cantonBirth;
  @Expose()
  readonly currentLocation;
  @Expose()
  readonly entryCohort;
  @Expose()
  readonly exitCohort;
  @Expose()
  readonly companyWork;
  @Expose()
  readonly companyArea;
  @Expose()
  readonly companyPosition;
  @Expose()
  readonly laborRelation;
  @Expose()
  readonly state;
  // @Expose()
  // readonly status;
}
