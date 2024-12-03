import { StudentDto } from './student.dto';
import { PickType } from '@nestjs/swagger';
import { BaseStudentDto } from './base-student.dto';

export class CreateStudentDto extends BaseStudentDto {}
