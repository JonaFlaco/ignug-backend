import { PartialType } from '@nestjs/swagger';
import { BaseTheoricalNoteDto } from '@uic/dto';

export class UpdateTheoricalNoteDto extends PartialType(BaseTheoricalNoteDto) {}
