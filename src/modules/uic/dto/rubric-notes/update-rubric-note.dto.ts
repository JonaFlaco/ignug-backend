import { PartialType } from '@nestjs/swagger';
import { BaseRubricNoteDto } from './base-rubric-note.dto';

export class UpdateRubricNoteDto extends PartialType(BaseRubricNoteDto) {}
