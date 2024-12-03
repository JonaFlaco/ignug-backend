import { PartialType } from '@nestjs/swagger';
import { BaseInscriptionDto } from '@uic/dto';

export class UpdateInscriptionDto extends PartialType(BaseInscriptionDto) {}
