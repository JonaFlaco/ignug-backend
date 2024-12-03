import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';
import { StudentEntity } from '../../../core/entities/student.entity';

export class FilterDefenseApprovedDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly StudentEntity;
}
