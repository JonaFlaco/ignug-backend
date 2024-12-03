import { Exclude, Expose } from 'class-transformer';
import { BaseRequirementDto } from '@uic/dto';
import { StatusEnum } from '../../enums';

@Exclude()
export class ReadRequirementDto extends BaseRequirementDto {
  @Expose()
  readonly id;

  // @Expose()
  // readonly required;

  @Expose()
  readonly description;

  @Expose()
  readonly planning;

  @Expose()
  readonly nameCatalogue;

  @Expose()
  readonly status: StatusEnum;
}
