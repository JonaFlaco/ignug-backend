import { PartialType } from '@nestjs/swagger';
import { BaseUploadProjectDto } from '@uic/dto';

export class UpdateUploadProjectDto extends PartialType(BaseUploadProjectDto) {}
