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
import { EventEntity } from './event.entity';

import {
  EnrollmentEntity,
  ModalityEntity,
  PreparationCourseEntity,
  ProfessionEntity,
  RequirementEntity,
  UploadRequirementRequestEntity,
} from '@uic/entities';

import { StudentDegreeEntity } from './student-degree.entity';
import { ReviewRequirementEntity } from './review-requirement.entity';
import { CareerEntity, YearEntity } from '@core/entities';

@Entity('plannings', { schema: 'uic' })
export class PlanningEntity {
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

  @ManyToOne(() => ModalityEntity, (modality) => modality.name)
  @JoinColumn({ name: 'modality_id' })
  modality: ModalityEntity;

  @ManyToOne(() => ProfessionEntity, (profession) => profession.planning)
  @JoinColumn({ name: 'profession_id' })
  profession: ProfessionEntity;

  //FK CAREER CORE
  @ManyToOne(() => CareerEntity, (career) => career.planning)
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  //@OneToMany(() => StudentDegreeEntity, (studentDegree) => studentDegree.plannings,)
  //plannings: StudentDegreeEntity[];

  @OneToMany(
    () => StudentDegreeEntity,
    (studentDegree) => studentDegree.namePlanning,
  )
  plannings: StudentDegreeEntity[];

  @OneToMany(() => EventEntity, (event) => event.planning)
  events: EventEntity[];

  @OneToMany(
    () => UploadRequirementRequestEntity,
    (uploadRequirementRequest) => uploadRequirementRequest.planning,
  )
  uploads: UploadRequirementRequestEntity[];

  @OneToMany(
    () => ReviewRequirementEntity,
    (reviewRequirement) => reviewRequirement.planning,
  )
  reviews: ReviewRequirementEntity[];

  // @OneToMany(
  //   () => ReviewRequirementEntity,
  //   (reviewRequirement) => reviewRequirement.namePlanning,
  // )
  // reviewRequirement: ReviewRequirementEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.planning)
  enrollments: EnrollmentEntity[];

  @OneToMany(() => RequirementEntity, (requirement) => requirement.planning)
  requirements: RequirementEntity[];

  @ManyToOne(() => YearEntity, (year) => year.planning)
  @JoinColumn({ name: 'year_id' })
  year: YearEntity;

  @OneToMany(
    () => PreparationCourseEntity,
    (preparationCourse) => preparationCourse.planningName,
  )
  planningName: PreparationCourseEntity[];

  // Fields
  @Column('text', {
    name: 'description',
    //unique: true,
    comment: 'Esta convocatoria es solo para egresados',
  })
  description: string;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fecha para la finalización de la convocatoria',
  })
  endDate: Date;

  @Column('varchar', {
    name: 'name',
    //unique: true,
    comment: 'Nombre de la Convocatoria',
  })
  name: string;

  @Column('boolean', {
    name: 'state',
    comment: 'Es el estado de la convocatoria',
  })
  state: boolean;
  @Column('timestamp', {
    name: 'start_date',
    comment: 'Fecha de inico de la convocatoria',
  })
  startDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setname() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }
}
