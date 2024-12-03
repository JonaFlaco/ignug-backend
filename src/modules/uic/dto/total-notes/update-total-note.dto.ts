import { PartialType } from '@nestjs/swagger';
import { BaseTotalNoteDto } from '@uic/dto';

export class UpdateTotalNoteDto extends PartialType(BaseTotalNoteDto) {}
