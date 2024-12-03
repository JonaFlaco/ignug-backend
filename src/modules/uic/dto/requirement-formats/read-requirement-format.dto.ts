import { Exclude, Expose } from 'class-transformer';
import { BaseRequirementFormatDto } from '@uic/dto';
import { ModalityEntity, ProfessionEntity } from '@uic/entities';

@Exclude()
export class ReadRequirementFormatDto extends BaseRequirementFormatDto {
  @Expose()
  readonly id;
  
  
  @Expose()
  readonly nameFormat;
  
  @Expose()
  readonly requiredFormat;
  
  @Expose()
  readonly filename;
  
  @Expose()
  readonly nameCareer;
  
  @Expose()
  readonly nameModality;
  

}
