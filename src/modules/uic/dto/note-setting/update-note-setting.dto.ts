import { PartialType } from '@nestjs/swagger';
import { BaseNoteSettingDto } from '@uic/dto';

export class UpdateNoteSettingDto extends PartialType(BaseNoteSettingDto) {}
