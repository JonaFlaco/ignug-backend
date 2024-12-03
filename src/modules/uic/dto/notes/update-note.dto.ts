import { PartialType } from '@nestjs/swagger';
import { BaseTribunalDto } from '@uic/dto';
import { BaseNoteDto } from './base-note.dto';

export class UpdateNoteDto extends PartialType(BaseNoteDto) {}
