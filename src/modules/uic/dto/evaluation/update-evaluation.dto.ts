import { PartialType } from '@nestjs/swagger';
import { BaseEvaluationDto } from '@uic/dto';

export class UpdateEvaluationDto extends PartialType(BaseEvaluationDto) {}
