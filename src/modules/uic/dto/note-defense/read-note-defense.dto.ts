import { Exclude, Expose } from 'class-transformer';
import { BaseNoteDefenseDto } from '@uic/dto';
@Exclude()
export class ReadNoteDefenseDto extends BaseNoteDefenseDto {
  @Expose()
  readonly id;

  @Expose()
  readonly student;

  @Expose()
  readonly score;


}
