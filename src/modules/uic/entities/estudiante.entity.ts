import { File } from 'src/shared/models/file.model';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ResponsibleTutorEntity } from './responsible-tutor.entity';
import {
  ComplexivoEntity,
  EvaluationEntity,
  PracticalCaseEntity,
  StudentDegreeEntity,
  TeacherEntity,
  TribunalEntity,
  TutorAssignmentEntity,
} from '@uic/entities';

@Entity('estudiantes', { schema: 'uic' })
export class EstudianteEntity {
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
    (studentDegree) => studentDegree.nameEstudiante,
  )
  estudiante: StudentDegreeEntity[];

  @OneToMany(() => TribunalEntity, (tribunal) => tribunal.name)
  estudiantes: TribunalEntity[];

  //FK COMPLEXIVO
  @OneToMany(() => ComplexivoEntity, (complexivo) => complexivo.name)
  estudiantes2: ComplexivoEntity[];

  @OneToMany(() => ComplexivoEntity, (complexivo) => complexivo.name2)
  estudiantes3: ComplexivoEntity[];

  @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.student)
  evaluation: EvaluationEntity[];

  
  @OneToMany(() => PracticalCaseEntity, (practicalCase) => practicalCase.student)
  practicalCase: PracticalCaseEntity[];

  @OneToMany(
    () => ResponsibleTutorEntity,
    (responsible) => responsible.nameStudent,
  )
  nameStudents: ResponsibleTutorEntity[];

  @ManyToOne(() => TeacherEntity, (tutor) => tutor.tutors)
  @JoinColumn({ name: 'teacher_id' })
  tutor: TeacherEntity;

  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.estudiante,
  )
  tutorAssignments: TutorAssignmentEntity[];

  //Fields

  @Column('date', {
    name: 'revision_date',
    comment: 'Fecha de revisión',
  })
  revisionDate: Date;

  @Column('varchar', {
    name: 'dni',
    comment: 'Cedula del estudiante (base de datos)',
  })
  dni: string;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del estudiante (base de datos)',
  })
  name: string;

  @Column('text', {
    name: 'observations',
    comment: 'Observaciones del tutor para el estudiante ',
  })
  observations: string;

  @Column('boolean', {
    name: 'state',
    comment: 'Estado del anteproyecto',
    nullable: true,
  })
  state: boolean;

  @Column('varchar', {
    name: 'title',
    comment: 'Titulo del anteproyecto(base de datos) ',
  })
  title: string;

  @BeforeInsert()
  @BeforeUpdate()
  setTitle() {
    if (!this.title) {
      return;
    }
    this.title = this.title.toUpperCase().trim();
  }
  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }
}
