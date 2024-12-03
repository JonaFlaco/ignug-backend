import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from '@core/dto';

export class UpdateTeacherDto extends PartialType(CreateStudentDto) {}
