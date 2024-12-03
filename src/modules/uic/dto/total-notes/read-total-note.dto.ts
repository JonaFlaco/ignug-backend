import { Exclude, Expose } from 'class-transformer';
import { BaseTotalNoteDto } from '@uic/dto';
@Exclude()
export class ReadTotalNoteDto extends BaseTotalNoteDto {
  @Expose()
  readonly id;

  @Expose()
  readonly noteOne;

  @Expose()
  readonly noteTwo;

  @Expose()
  readonly finalNote;
}
