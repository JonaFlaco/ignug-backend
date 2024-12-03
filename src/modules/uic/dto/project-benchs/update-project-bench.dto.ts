import { PartialType } from '@nestjs/swagger';
import { BaseProjectBenchDto } from '@uic/dto';

export class UpdateProjectBenchDto extends PartialType(BaseProjectBenchDto) {}
