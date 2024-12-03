import { PartialType } from '@nestjs/swagger';
import { BaseCoordinatorDto } from './base-coordinator.dto';

export class UpdateCoordinatorDto extends PartialType(BaseCoordinatorDto) {}
