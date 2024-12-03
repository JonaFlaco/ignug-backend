import { PartialType } from '@nestjs/swagger';
import { BaseTotalCaseDto } from '@uic/dto';

export class UpdateTotalCaseDto extends PartialType(BaseTotalCaseDto) {}
