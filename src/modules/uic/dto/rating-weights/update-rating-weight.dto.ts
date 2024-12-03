import { PartialType } from '@nestjs/swagger';
import { BaseRatingWeightDto } from '@uic/dto';

export class UpdateRatingWeightDto extends PartialType(BaseRatingWeightDto) {}
