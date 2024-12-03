import { PartialType } from '@nestjs/swagger';
import { BaseStudentDegreeDto } from '@uic/dto';

export class UpdateStudentDegreeDto extends PartialType(BaseStudentDegreeDto) {}
