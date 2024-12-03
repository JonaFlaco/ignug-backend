import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../../../auth/entities/user.entity';

export class FilterTheoricalNoteDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly note: string;

  @IsOptional()
  readonly userId: string;
}
