import { Allow } from 'class-validator';
import { StudentEntity } from '@core/entities';
import { NoteDefenseEntity } from '../../entities/note-defense.entity';

export class BaseDefenseApprovedDto {
  @Allow()
  readonly student: StudentEntity;

  @Allow()
  readonly rating: NoteDefenseEntity;
}
