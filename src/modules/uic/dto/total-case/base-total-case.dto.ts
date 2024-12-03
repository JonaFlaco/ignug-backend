import { Allow} from 'class-validator';
import { StudentEntity } from '@core/entities';
import { NoteSettingEntity } from '../../entities/note-setting.entity';
import { NoteDefenseEntity } from '../../entities/note-defense.entity';

export class BaseTotalCaseDto {
  @Allow()
  readonly student: StudentEntity;

  @Allow()
  readonly setting: NoteSettingEntity;

  @Allow()
  readonly defense: NoteDefenseEntity;

}
