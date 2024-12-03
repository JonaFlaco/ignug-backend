import { CareerEntity } from '@core/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ComplexTimelineEntity } from './complex-timeline.entity';
import { TutorAssignmentEntity } from './tutor-assignment.entity';

@Entity('upload_projects', { schema: 'uic' })
export class UploadProjectEntity {
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

  //FK CAREER CORE
  @ManyToOne(() => CareerEntity, (nameCareer) => nameCareer.project)
  @JoinColumn({ name: 'nameCareer_id' })
  nameCareer: CareerEntity;

  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.uploadProject,
  )
  tutorAssignments: TutorAssignmentEntity;

  // FK ComplexTimeline
  @OneToMany(() => ComplexTimelineEntity, (timeline) => timeline.topicProject)
  timeline: ComplexTimelineEntity[];

  // Fields
  @Column('varchar', {
    name: 'theme',
    comment: 'tema del proyecto',
  })
  theme: string;

  @Column('varchar', {
    name: 'members',
    comment: 'integrantes del proyecto',
  })
  members: string;

  @Column('varchar', {
    name: 'summary',
    comment: 'resumen ejecutivo del proyecto',
  })
  summary: string;

  @BeforeInsert()
  @BeforeUpdate()
  settheme() {
    if (!this.theme) {
      return;
    }
    this.theme = this.theme.toUpperCase().trim();
  }
}
