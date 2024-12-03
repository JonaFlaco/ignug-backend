import { PartialType } from '@nestjs/swagger';
import { BaseItemDto } from '@uic/dto';

export class UpdateItemDto extends PartialType(BaseItemDto) {}
