import { PartialType } from '@nestjs/swagger';
import { BaseCatalogueTypeDto } from '@uic/dto';

export class UpdateCatalogueTypeDto extends PartialType(BaseCatalogueTypeDto) {}
