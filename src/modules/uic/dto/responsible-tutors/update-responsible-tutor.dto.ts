import { PartialType } from '@nestjs/swagger';
import { BaseResponsibleTutorDto } from '@uic/dto';

export class UpdateResponsibleTutorDto extends PartialType(BaseResponsibleTutorDto) {}
