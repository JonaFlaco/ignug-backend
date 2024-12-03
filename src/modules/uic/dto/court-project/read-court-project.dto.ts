import { Exclude, Expose } from 'class-transformer';
import { BaseCourtProjectDto } from '@uic/dto';
@Exclude()
export class ReadCourtProjectDto extends BaseCourtProjectDto {
  @Expose()
  readonly id;

  @Expose()
  readonly proyect;

  @Expose()
  readonly tribunal;

  @Expose()
  readonly description;

  @Expose()
  readonly place;

  @Expose()
  readonly defenseAt;
}
