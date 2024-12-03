import { Exclude, Expose } from 'class-transformer';
import { BaseNoteSettingDto } from '@uic/dto';
@Exclude()
export class ReadNoteSettingDto extends BaseNoteSettingDto {
  @Expose()
  readonly id;

  @Expose()
  readonly student;

  @Expose()
  readonly document;

  @Expose()
  readonly evaluation;
}
