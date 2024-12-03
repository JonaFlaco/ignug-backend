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

@Entity('complex_timelines', { schema: 'uic' })
export class ComplexTimelineEntity {
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
  @ManyToOne(() => UploadProjectEntity, (topicProject) => topicProject.timeline)
  @JoinColumn({ name: 'topicProject_id' })
  topicProject: UploadProjectEntity;

  //Fields

  @Column('varchar', {
    name: 'activity',
    comment: 'Actividad de la tutoria',
    nullable: true,
  })
  activity: string;

  @Column('date', {
    name: 'meeting_date',
    comment: 'Fecha de la tutoria',
    nullable: true,
  })
  meetingDate: Date;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripción de la tutoria',
    nullable: true,
  })
  description: string;
}
