import { Exclude, Expose } from 'class-transformer';
import { BaseTribunalDto } from '@uic/dto';
import { BaseNoteDto } from './base-note.dto';
@Exclude()
export class ReadNoteDto extends BaseNoteDto {
  @Expose()
  readonly id;

  @Expose()
  readonly studentInformation;

  @Expose()
  readonly projectBench;

  @Expose()
  readonly description;

  @Expose()
  readonly state;

  @Expose()
  readonly score;

  @Expose()
  readonly score2;

  @Expose()
  readonly score3;

  @Expose()
  readonly score4;

  @Expose()
  readonly observation;

}
