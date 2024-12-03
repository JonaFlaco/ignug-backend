import { PartialType } from '@nestjs/swagger';
import { BaseMemorandumDto } from '@uic/dto';

export class UpdateMemorandumDto extends PartialType(BaseMemorandumDto) {}
