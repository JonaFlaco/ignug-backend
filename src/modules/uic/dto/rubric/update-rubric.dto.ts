import { PartialType } from '@nestjs/swagger';
import { BaseRubricDto } from '@uic/dto';

export class UpdateRubricDto extends PartialType(BaseRubricDto) {}
