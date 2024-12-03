import { Exclude, Expose } from 'class-transformer';
import { BaseTotalCaseDto } from '@uic/dto';
@Exclude()
export class ReadTotalCaseDto extends BaseTotalCaseDto {
  @Expose()
  readonly id;

  @Expose()
  readonly student;

  @Expose()
  readonly document;

  @Expose()
  readonly evaluation;
}
