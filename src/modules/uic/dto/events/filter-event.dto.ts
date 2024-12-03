import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CatalogueEntity } from '../../entities/catalogue.entity';

export class FilterEventDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly sort: number;
  @IsUUID()
  readonly planningId?: string;
  readonly name?: string;
}
