import { Exclude, Expose } from 'class-transformer';
import { BasePracticalCaseDto } from '@uic/dto';

@Exclude()
export class ReadPracticalCaseDto extends BasePracticalCaseDto {
  
  @Expose()
  readonly id;

  @Expose()
  readonly proyect;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly student;

  @Expose()
  readonly teacher;

}
