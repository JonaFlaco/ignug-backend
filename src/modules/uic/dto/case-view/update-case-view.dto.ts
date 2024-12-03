import { PartialType } from '@nestjs/swagger';
import { BaseCaseViewDto } from '@uic/dto';

export class UpdateCaseViewDto extends PartialType(BaseCaseViewDto) {}
