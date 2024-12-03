import { Exclude, Expose } from 'class-transformer';
import { BaseCatalogueTypeDto } from '@uic/dto';

@Exclude()
export class ReadCatalogueTypeDto extends BaseCatalogueTypeDto {
  @Expose()
  readonly id;


  @Expose()
  readonly name;

  @Expose()
  readonly code;
}
