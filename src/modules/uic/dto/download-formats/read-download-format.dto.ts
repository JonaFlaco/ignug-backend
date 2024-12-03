import { Exclude, Expose } from 'class-transformer';
import { BaseDownloadFormatDto } from '@uic/dto';
@Exclude()
export class ReadDownloadFormatDto extends BaseDownloadFormatDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly file;
  
  @Expose()
  readonly request;
}
