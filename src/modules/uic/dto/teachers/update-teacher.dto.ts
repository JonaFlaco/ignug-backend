import { PartialType } from '@nestjs/swagger';
import { BaseTeacherDto } from '@uic/dto';

export class UpdateTeacherDto extends PartialType(BaseTeacherDto) {}
