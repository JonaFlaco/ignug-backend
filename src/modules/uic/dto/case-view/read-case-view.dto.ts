import { Exclude, Expose } from 'class-transformer';
import { BaseCaseViewDto } from './base-case-view.dto';

@Exclude()
export class ReadCaseViewDto extends BaseCaseViewDto {
  @Expose()
  readonly id;

  @Expose()
  readonly activity;

  @Expose()
  readonly meetingDate;

  @Expose()
  readonly description;
}
