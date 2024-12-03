import { PartialType } from '@nestjs/swagger';
import { BaseUploadScoreDto } from '@uic/dto';

export class UpdateUploadScoreDto extends PartialType(BaseUploadScoreDto) {}
