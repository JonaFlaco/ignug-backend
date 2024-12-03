import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import {
  ProjectEntity,
  PlanningEntity,
  ModalityEntity,
  CatalogueEntity,
  TheoricalNoteEntity,
} from '@uic/entities';
import { StudentEntity } from '@core/entities';

@Entity('enrollment', { schema: 'uic' })
export class EnrollmentEntity {
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

  // Relationships falta mesh_students(IGNUG)
  @ManyToOne(() => ModalityEntity, (modality) => modality.enrollments)
  @JoinColumn({ name: 'modality_id' })
  modality: ModalityEntity;

  @ManyToOne(() => StudentEntity, (student) => student.enrollments)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => PlanningEntity, (planning) => planning.enrollments)
  @JoinColumn({ name: 'planning_id' })
  planning: PlanningEntity;

  @OneToMany(() => ProjectEntity, (project) => project.enrollment)
  projects: ProjectEntity[];

  @OneToMany(() => TheoricalNoteEntity, (theorical) => theorical.name)
  theorical: TheoricalNoteEntity[];

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.enrollments)
  @JoinColumn({ name: 'state_id' })
  catalogue: CatalogueEntity;

  // Fields
  @Column('varchar', {
    name: 'code',
    unique: true,
    comment: 'codigo de inscripcion/matricula ej: 12SAD12',
  })
  code: string;

  @Column('varchar', {
    name: 'state',
    //unique: true,
    comment: 'state',
  })
  state: string;

  @Column('boolean', {
    name: 'stateM',
    comment: 'es el estado para filtrat estudiantes',
    default: false,
  })
  stateM: boolean;

  @Column('varchar', {
    name: 'observation',
    comment: 'Comentario en caso de necesitar corregir un documento',
  })
  observation: string;

  @Column('date', {
    name: 'registered_at',
    comment: 'fecha de la matricula',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registeredAt: Date;
}
