import { Exclude, Expose } from 'class-transformer';
import { BaseUploadScoreDto } from '@uic/dto';
@Exclude()
export class ReadUploadScoreDto extends BaseUploadScoreDto {
  @Expose()
  readonly id;

  @Expose()
  readonly nameCareer;

  @Expose()
  readonly name;
  
  @Expose()
  readonly dni;

  @Expose()
  readonly score;
}
