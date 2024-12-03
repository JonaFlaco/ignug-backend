import { Exclude, Expose } from 'class-transformer';
import { BaseDefenseApprovedDto } from '@uic/dto';
@Exclude()
export class ReadDefenseApprovedDto extends BaseDefenseApprovedDto {
  @Expose()
  readonly id;

  @Expose()
  readonly student;

  @Expose()
  readonly rating;


}
