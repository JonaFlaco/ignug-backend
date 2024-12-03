import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { InscriptionEntity } from './inscription.entity';
import { TutorAssignmentEntity } from './tutor-assignment.entity';
import { PracticalCaseEntity } from './practical-case.entity';
import { NoteEntity } from './note.entity';
import { StatusEnum } from '../enums';

@Entity('student_informatios', { schema: 'uic' })
export class StudentInformationEntity {
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

  // @ManyToOne(() => StudentEntity, (student) => student.studentInformations)
  // @JoinColumn({ name: 'student_id' })
  // student: StudentEntity;
  @OneToMany(
    () => InscriptionEntity,
    (inscription) => inscription.studentInformation,
  )
  inscription: InscriptionEntity[];

  @OneToMany(() => NoteEntity, (note) => note.studentInformation)
  note: NoteEntity[];

  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.student,
  )
  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.student,
  )
  tutorAssignments: TutorAssignmentEntity;

  @OneToMany(
    () => PracticalCaseEntity,
    (practicalCase) => practicalCase.student,
  )
  practicalCase: PracticalCaseEntity[];
  //Fields

  @Column('numeric', {
    name: 'cedula',
    comment: 'Cedula del estudiante',
  })
  cedula: number;

  @Column('text', {
    name: 'name',
    comment: 'Nombres y apellidos del estudiante',
  })
  name: string;

  @Column('numeric', {
    name: 'phone',
    comment: 'Celular del estudiante',
  })
  phone: number;

  @Column('text', {
    name: 'genre',
    comment: 'Genero del estudiante',
  })
  genre: string;

  @Column('varchar', {
    name: 'personal_email',
    comment: 'Correo personal de estudiante',
  })
  personalEmail: string;

  @Column('varchar', {
    name: 'email',
    comment: 'Correo institucional de estudiante',
  })
  email: string;

  @Column('timestamp', {
    name: 'birth_date',
    comment: 'Fecha de nacimiento del estudiante',
  })
  birthDate: Date;

  @Column('text', {
    name: 'province_birth',
    comment: 'Provincia de nacimiento',
  })
  provinceBirth: string;

  @Column('text', {
    name: 'canton_birth:',
    comment: 'Canton de nacimiento',
  })
  cantonBirth: string;

  @Column('varchar', {
    name: 'current_location:',
    comment: 'Dirección actual',
  })
  currentLocation: string;

  @Column('text', {
    name: 'entry_cohort:',
    comment: 'Cohorte de ingreso',
  })
  entryCohort: string;

  @Column('timestamp', {
    name: 'exit _cohort:',
    comment: 'Cohorte de salida',
  })
  exitCohort: Date;

  @Column('text', {
    name: 'company_work:',
    comment: 'Empresa donde labora',
  })
  companyWork: string;

  @Column('text', {
    name: 'company_area:',
    comment: 'Area de la empresa donde labora',
  })
  companyArea: string;

  @Column('text', {
    name: 'company_position:',
    comment: 'Area de la empresa donde labora',
  })
  companyPosition: string;

  @Column('text', {
    name: 'labor_relation:',
    comment: 'Relación laboral con la carrera',
  })
  laborRelation: string;

  @Column('boolean', {
    name: 'status:',
    comment: 'Area de la empresa donde labora',
  })
  state: boolean;

  // @Column('enum', {
  //   name: 'status',
  //   enum: StatusEnum,
  //   default: StatusEnum.WAITING,
  //   comment:
  //     'Contiene los estados en la cual el rector y el cordindor deben autorizar',
  // })
  // status: StatusEnum;
}
