import { PartialType } from '@nestjs/swagger';
import { BaseCourtProjectDto } from '@uic/dto';

export class UpdateCourtProjectDto extends PartialType(BaseCourtProjectDto) {}
