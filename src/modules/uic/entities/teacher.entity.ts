import {
  ComplexivoEntity,
  EstudianteEntity,
  PracticalCaseEntity,
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
} from 'typeorm';

@Entity('teachers', { schema: 'uic' })
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

  @OneToMany(
    () => PracticalCaseEntity,
    (practicalCase) => practicalCase.teacher,
  )
  practicalCase: PracticalCaseEntity[];

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

  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.teacher,
  )
  tutorAssignments: TutorAssignmentEntity[];

  //Fields
  @Column('varchar', {
    name: 'dni',
    comment: 'Cedula del tutor (base de datos)',
  })
  dni: string;

  @Column('varchar', {
    name: 'tutor',
    comment: 'Nombre del tutor (base de datos)',
  })
  tutor: string;
}
