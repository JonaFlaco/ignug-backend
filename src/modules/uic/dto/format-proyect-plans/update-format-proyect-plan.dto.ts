import { PartialType } from '@nestjs/swagger';
import { BaseEventDto } from '@uic/dto';

export class UpdateFormatProyectPlanDto extends PartialType(BaseEventDto) {}
