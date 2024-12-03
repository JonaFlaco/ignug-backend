import { Exclude, Expose } from 'class-transformer';
import { BaseComplexTimelineDto } from '@uic/dto';

@Exclude()
export class ReadComplexTimelineDto extends BaseComplexTimelineDto {
  @Expose()
  readonly id;

  @Expose()
  readonly topicProject;

  @Expose()
  readonly activity;

  @Expose()
  readonly meetingDate;

  @Expose()
  readonly description;
}
