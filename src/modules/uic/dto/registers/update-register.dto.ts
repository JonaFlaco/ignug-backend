import { PartialType } from '@nestjs/swagger';
import { BaseRegisterDto } from '@uic/dto';

export class UpdateRegisterDto extends PartialType(BaseRegisterDto) {}
