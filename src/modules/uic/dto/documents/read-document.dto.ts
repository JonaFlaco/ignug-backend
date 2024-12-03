import { Exclude, Expose } from 'class-transformer';
import { BaseDocumentDto } from '@uic/dto';

@Exclude()
export class ReadDocumentDto extends BaseDocumentDto {
  @Expose()
  readonly id;

  @Expose()
  readonly observation;

  @Expose()
  readonly year;

  @Expose()
  readonly requerimiento;

  @Expose()
  readonly estudiante;

  @Expose()
  readonly cedula;
}
