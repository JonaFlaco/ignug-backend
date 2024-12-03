import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';
import { CareerEntity } from '../../entities/career.entity';

export class FilterStudentDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  // @IsOptional()
  // readonly career: CareerEntity;
}
