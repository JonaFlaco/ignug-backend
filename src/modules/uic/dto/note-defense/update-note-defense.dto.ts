import { PartialType } from '@nestjs/swagger';
import { BaseNoteDefenseDto } from '@uic/dto';

export class UpdateNoteDefenseDto extends PartialType(BaseNoteDefenseDto) {}
