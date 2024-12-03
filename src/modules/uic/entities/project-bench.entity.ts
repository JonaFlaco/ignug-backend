import {
  DownloadFormatEntity,
  EnrollmentEntity,
  InscriptionEntity,
  NoteEntity,
  PlanningEntity,
  TutorAssignmentEntity,
  UploadRequirementRequestEntity,
} from '@uic/entities';
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
import { StudentDegreeEntity } from './student-degree.entity';
import { ReviewRequirementEntity } from './review-requirement.entity';
import { TeacherEntity } from '@core/entities';

@Entity('project_benchs', { schema: 'uic' })
export class ProjectBenchEntity {
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

  // Relationships
  @OneToMany(
    () => StudentDegreeEntity,
    (studentDegree) => studentDegree.nameModality,
  )
  modalities: StudentDegreeEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.planning)
  enrollments: EnrollmentEntity[];

  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.name,
  )
  tutorAssignments: TutorAssignmentEntity[];

  @OneToMany(() => NoteEntity, (note) => note.projectBench)
  note: NoteEntity[];

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.projectBench)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  // Fields

  @Column('varchar', {
    name: 'title',
    comment: 'Titulo del Proyecto',
  })
  title: string;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del Proyecto',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Titulo del Proyecto',
  })
  description: string;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Fecha de inico ',
  })
  startDate: Date;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fecha de finalización',
  })
  endDate: Date;

  @Column('boolean', {
    name: 'state',
    comment: 'Si esta activo el proyecto',
  })
  state: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  setname() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }
}
