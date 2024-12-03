import { PartialType } from '@nestjs/swagger';
import { BaseEvaluationDateDto } from '@uic/dto';

export class UpdateEvaluationDateDto extends PartialType(BaseEvaluationDateDto) {}
