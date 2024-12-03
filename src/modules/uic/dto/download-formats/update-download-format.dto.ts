import { PartialType } from '@nestjs/swagger';
import { BaseDownloadFormatDto } from '@uic/dto';

export class UpdateDownloadFormatDto extends PartialType(BaseDownloadFormatDto) {}
