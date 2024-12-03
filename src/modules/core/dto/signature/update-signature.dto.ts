import { PartialType } from '@nestjs/swagger';
import { BaseSignatureDto } from '@core/dto';

export class UpdateSignatureDto extends PartialType(BaseSignatureDto) {}
