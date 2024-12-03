import { Exclude, Expose } from 'class-transformer';
import { BaseUploadRequirementRequestDto } from '@uic/dto';

@Exclude()
export class ReadUploadRequirementRequestDto extends BaseUploadRequirementRequestDto {
  @Expose()
  readonly id;

  @Expose()
  readonly file;
}
