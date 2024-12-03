import { PartialType } from '@nestjs/swagger';
import { BasePreparationCourseDto } from '@uic/dto';

export class UpdatePreparationCourseDto extends PartialType(BasePreparationCourseDto) {}
