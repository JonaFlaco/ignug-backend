import { PartialType } from '@nestjs/swagger';
import { BaseYearDto } from '@core/dto';

export class UpdateYearDto extends PartialType(BaseYearDto) {}
