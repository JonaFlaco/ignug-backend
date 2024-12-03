import { PartialType } from '@nestjs/swagger';
import { BasePracticalCaseDto } from '@uic/dto';

export class UpdatePracticalCaseDto extends PartialType(BasePracticalCaseDto) {}
