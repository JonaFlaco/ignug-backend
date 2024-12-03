import { PartialType } from '@nestjs/swagger';
import { BaseIndividualDefenseDto } from '@uic/dto';

export class UpdateIndividualDefenseDto extends PartialType(BaseIndividualDefenseDto) {}
