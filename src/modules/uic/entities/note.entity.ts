import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import {
  ProjectBenchEntity,
  StudentInformationEntity,
  TeacherEntity,
} from '@uic/entities';

@Entity('notes', { schema: 'uic' })
export class NoteEntity {
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
  @ManyToOne(
    () => StudentInformationEntity,
    (studentInformation) => studentInformation.note,
  )
  @JoinColumn({ name: 'student_information_id' })
  studentInformation: StudentInformationEntity;

  @ManyToOne(() => ProjectBenchEntity, (projectBench) => projectBench.note)
  @JoinColumn({ name: 'project_bench_id' })
  projectBench: ProjectBenchEntity;

  //Fields

  @Column('varchar', {
    name: 'description',
    comment: 'Es la descripcion del Proyecto asignado',
  })
  description: string;

  @Column('boolean', {
    name: 'state',
    comment: 'Proceso del Seguimiento',
  })
  state: boolean;

  @Column('integer', {
    name: 'score',
    nullable: true,
    comment: 'Nota Revisión 1',
  })
  score: number;

  @Column('integer', {
    name: 'score2',
    nullable: true,
    comment: 'Nota Revisión 2',
  })
  score2: number;

  @Column('integer', {
    name: 'score3',
    nullable: true,
    comment: 'Revisión 3',
  })
  score3: number;

  @Column('integer', {
    name: 'score4',
    nullable: true,
    comment: 'Revisión 4',
  })
  score4: number;

  @Column('varchar', {
    name: 'observation',
    comment: 'Agregar observaciones acerca de las notas',
  })
  observation: string;
}
