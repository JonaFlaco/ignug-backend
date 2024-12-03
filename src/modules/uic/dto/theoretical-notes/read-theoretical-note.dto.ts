import { Exclude, Expose } from 'class-transformer';
import { BaseTheoricalNoteDto } from '@uic/dto';
@Exclude()
export class ReadTheoricalNoteDto extends BaseTheoricalNoteDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly note;

  @Expose()
  readonly observations;
}
