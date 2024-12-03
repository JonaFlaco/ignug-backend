import { PartialType } from '@nestjs/swagger';
import { BaseFormatDto } from '@uic/dto';

export class UpdateFormatDto extends PartialType(BaseFormatDto) {}
