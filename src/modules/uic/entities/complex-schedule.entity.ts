import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UploadProjectEntity } from './upload-project.entity';

@Entity('complex_schedules', { schema: 'uic' })
export class ComplexScheduleEntity {
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

  //FK UploadProject
  // @ManyToOne(() => UploadProjectEntity, (topicProject) => topicProject.timeline)
  // @JoinColumn({ name: 'topicProject_id' })
  // topicProject: UploadProjectEntity;

  //Fields

  @Column('varchar', {
    name: 'activity',
    comment: 'Actividad de la tutoria',
    nullable: true,
  })
  activity: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripción de la tutoria',
    nullable: true,
  })
  description: string;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Fecha de inico de la convocatoria',
  })
  startDate: Date;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fecha para la finalización de la convocatoria',
  })
  endDate: Date;

  @Column('boolean', {
    name: 'state',
    comment: 'Es el estado de la actividad',
  })
  state: boolean;

  @Column('numeric', {
    name: 'sort',
    comment: 'Orden de las fases',
  })
  sort: number;
}
