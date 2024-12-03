import { Exclude, Expose } from 'class-transformer';
import { BaseRubricNoteDto } from './base-rubric-note.dto';
@Exclude()
export class ReadRubricNoteDto extends BaseRubricNoteDto {
  @Expose()
  readonly id;

  @Expose()
  readonly rubric;

  @Expose()
  readonly note;
  
  @Expose()
  readonly teacher;

  @Expose()
  readonly student;

}
