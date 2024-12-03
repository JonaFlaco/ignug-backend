import { PartialType } from '@nestjs/swagger';
import { BaseTribunalDto } from '@uic/dto';

export class UpdateTribunalDto extends PartialType(BaseTribunalDto) {}
