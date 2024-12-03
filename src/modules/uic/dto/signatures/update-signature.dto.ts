import { PartialType } from '@nestjs/swagger';
import { BaseSignatureDto } from '@uic/dto';

export class UpdateSignatureDto extends PartialType(BaseSignatureDto) {}
