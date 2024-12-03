import { PartialType } from '@nestjs/swagger';
import { BaseComplexivoDto } from '@uic/dto';

export class UpdateComplexivoDto extends PartialType(BaseComplexivoDto) {}
