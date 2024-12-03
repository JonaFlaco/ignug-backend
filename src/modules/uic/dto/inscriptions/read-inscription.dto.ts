import { Exclude, Expose } from 'class-transformer';
import { BaseInscriptionDto } from '@uic/dto';
import { StatusEnum } from '../../enums';

@Exclude()
export class ReadInscriptionDto extends BaseInscriptionDto {
  @Expose()
  readonly id;

  @Expose()
  readonly student;
  @Expose()
  readonly studentInformation;

  @Expose()
  readonly dni;

  @Expose()
  readonly isEnable;

  @Expose()
  readonly document;

  @Expose()
  readonly requirement;

  @Expose()
  readonly request;

  @Expose()
  readonly docUpload;

  @Expose()
  readonly modality;

  @Expose()
  readonly observation;

  @Expose()
  readonly status: StatusEnum;
}
