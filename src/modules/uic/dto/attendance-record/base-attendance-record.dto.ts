import { Allow } from 'class-validator';
import { PlanningEntity } from '../../entities/planning.entity';

export class BaseAttendanceRecordDto {
  @Allow()
  readonly planning: PlanningEntity;
}
