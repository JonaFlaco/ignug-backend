import { PartialType } from '@nestjs/swagger';
import { BaseRequirementFormatDto } from '@uic/dto';

export class UpdateRequirementFormatDto extends PartialType(BaseRequirementFormatDto) {}
