import {
  ComplexivoEntity,
  EstudianteEntity,
  MemorandumEntity,
  PracticalCaseEntity,
  ProjectBenchEntity,
  SignatureEntity,
  TribunalEntity,
  TutorAssignmentEntity,
} from '@uic/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { CareerEntity } from './career.entity';
import { UserEntity } from '@auth/entities';
import { InformationStudentEntity } from './information-student.entity';
import { InformationTeacherEntity } from './information-teacher.entity';
import { RubricNoteEntity } from 'src/modules/uic/entities/rubric-note.entity';

@Entity('teachers', { schema: 'core' })
export class TeacherEntity {
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

  //Relationships

  @OneToMany(() => SignatureEntity, (signature) => signature.tutor)
  teacher: SignatureEntity[];

  @OneToMany(
    () => PracticalCaseEntity,
    (practicalCase) => practicalCase.teacher,
  )
  practicalCase: PracticalCaseEntity[];

  @OneToMany(
    () => ProjectBenchEntity,
    (projectBench) => projectBench.teacher,
  )
  projectBench: ProjectBenchEntity[];

  @OneToMany(() => TribunalEntity, (tribunal) => tribunal.tutor)
  teachers: TribunalEntity[];

  @OneToMany(() => TribunalEntity, (tribunal) => tribunal.president)
  presidents: TribunalEntity[];

  @OneToMany(() => TribunalEntity, (tribunal) => tribunal.vocal)
  vocals: TribunalEntity[];

  @OneToMany(() => EstudianteEntity, (estudiante) => estudiante.tutor)
  tutors: EstudianteEntity[];
  //COMPLEXIVO

  @OneToMany(() => ComplexivoEntity, (Complexivo) => Complexivo.tutor)
  teacherss: ComplexivoEntity[];

  @OneToMany(() => ComplexivoEntity, (Complexivo) => Complexivo.president)
  presidentss: ComplexivoEntity[];

  @OneToMany(() => ComplexivoEntity, (Complexivo) => Complexivo.vocal)
  vocalss: ComplexivoEntity[];

  @OneToMany(() => SignatureEntity, (signature) => signature.tutor)
  teacherS: SignatureEntity[];

  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.teacher,
  )
  tutorAssignments: TutorAssignmentEntity[];

  @OneToMany(() => MemorandumEntity, (memorandum) => memorandum.nameTeacher)
  teacherrs: MemorandumEntity[];

  @ManyToOne(() => CareerEntity, (career) => career.teacher)
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;


  /** Inverse Relationship **/
  @OneToOne(() => InformationTeacherEntity)
  @JoinColumn({ name: 'teacher' })
  informationTeacherEntity: InformationTeacherEntity;

  /** Relationship **/
  @OneToOne(() => UserEntity, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  
  @OneToMany(() => RubricNoteEntity, (note) => note.teacher)
  note: RubricNoteEntity[];

  /** Columns **/
  @Column({ name: 'name', type: 'varchar', comment: 'Nombre del Profesor' })
  name: string;
  data: boolean | object;

  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    this.name = this.name.toUpperCase()

  }
}

