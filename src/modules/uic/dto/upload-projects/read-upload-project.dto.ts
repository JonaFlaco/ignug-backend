import { Exclude, Expose } from 'class-transformer';
import { BaseUploadProjectDto } from '@uic/dto';
@Exclude()
export class ReadUploadProjectDto extends BaseUploadProjectDto {
  @Expose()
  readonly id;

  @Expose()
  readonly nameCareer;

  @Expose()
  readonly theme;
  
  @Expose()
  readonly members;

  @Expose()
  readonly summary;
}
