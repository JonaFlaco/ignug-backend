import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('schedule_activities', { schema: 'uic' })
export class ScheduleActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  //FK

  //Fields

  @Column('varchar', {
    name: 'assignment',
    comment: 'Actividad asignada por el tutor al estudiante',
    nullable: true,
  })
  assignment: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripción de la tutoria',
    nullable: true,
  })
  description: string;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Fecha de inico de la actividad',
  })
  startDate: Date;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fecha para la finalización de la actividad',
  })
  endDate: Date;

  @Column('boolean', {
    name: 'state',
    comment: 'Estado de la Actividad',
  })
  state: boolean;
}
