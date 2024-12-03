import { PartialType } from '@nestjs/swagger';
import { BaseAssignamentDto } from '@uic/dto';

export class UpdateAssignamentDto extends PartialType(BaseAssignamentDto) {}
