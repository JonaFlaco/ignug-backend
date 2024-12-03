import { Allow } from 'class-validator';
import { StudentEntity } from '@core/entities';
import { RubricNoteEntity } from '../../entities/rubric-note.entity';

export class BaseNoteDefenseDto {
  @Allow()
  readonly nameStudent: StudentEntity;

  @Allow()
  readonly score: RubricNoteEntity;
}
