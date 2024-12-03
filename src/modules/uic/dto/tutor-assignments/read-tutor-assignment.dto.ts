import { Exclude, Expose } from 'class-transformer';
import { BaseTutorAssignmentDto } from '@uic/dto';

@Exclude()
export class ReadTutorAssignmentDto extends BaseTutorAssignmentDto {

  @Expose()
  readonly id;

  @Expose()
  readonly observation;

  @Expose()
  readonly uploadProject;

  @Expose()
  readonly teacher;

  @Expose()
  readonly student;


}
