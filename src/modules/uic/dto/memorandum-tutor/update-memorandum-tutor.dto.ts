import { PartialType } from '@nestjs/swagger';
import { BaseMemorandumTutorDto } from '@uic/dto';

export class UpdateMemorandumTutorDto extends PartialType(
  BaseMemorandumTutorDto,
) {}
