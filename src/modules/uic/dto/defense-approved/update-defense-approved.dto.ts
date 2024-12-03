import { PartialType } from '@nestjs/swagger';
import { BaseDefenseApprovedDto } from '@uic/dto';

export class UpdateDefenseApprovedDto extends PartialType(BaseDefenseApprovedDto) {}
