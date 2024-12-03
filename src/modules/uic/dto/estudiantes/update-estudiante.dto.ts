import { PartialType } from '@nestjs/swagger';
import { BaseEstudianteDto } from '@uic/dto';

export class UpdateEstudianteDto extends PartialType(BaseEstudianteDto) {}
