import {
  CatalogueEntity,
  DownloadFormatEntity,
  EnrollmentEntity,
  InscriptionEntity,
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

@Entity('modalities', { schema: 'uic' })
export class ModalityEntity {
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

  // @OneToMany(
  //   () => ReviewRequirementEntity,
  //   (reviewRequirement) => reviewRequirement.nameModality,
  // )
  // reviewRequirement: ReviewRequirementEntity[];

  // @OneToMany(() => InscriptionEntity, (inscription) => inscription.nameModality)
  // inscription: InscriptionEntity[];

  // Fields

  @Column('text', {
    name: 'description',
    comment: 'Es la descripcion de la modalidad',
  })
  description: string;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre de la modalidad (TIC/EC)',
  })
  name: string;
  planning: any;

  @Column('boolean', {
    name: 'state',
    comment: 'Es la descripcion de la modalidad',
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
