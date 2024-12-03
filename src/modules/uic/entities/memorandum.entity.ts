import { StudentEntity, TeacherEntity } from '@core/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('memorandums', { schema: 'uic' })
export class MemorandumEntity {
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

  //Relationship

  @ManyToOne(() => TeacherEntity, (nameTeacher) => nameTeacher.teacherrs)
  @JoinColumn({ name: 'nameTeacher_id' })
  nameTeacher: TeacherEntity;

  @ManyToOne(() => StudentEntity, (nameStudent) => nameStudent.students)
  @JoinColumn({ name: 'nameStudent_id' })
  nameStudent: StudentEntity;

  // Fields

  @Column('varchar', {
    name: 'type',
    comment: 'Tipo de Memorando',
  })
  type: string;

  @Column('varchar', {
    name: 'lab',
    comment: 'Lugar del examen',
  })
  lab: string;

  @Column('date', {
    name: 'date_written',
    comment: 'Fecha de redacción del memorando',
  })
  dateWritten: Date;

  @Column('date', {
    name: 'date_application',
    comment: 'Fecha toma de examen',
  })
  dateApplication: Date;

  @Column('varchar', {
    name: 'time',
    comment: 'Hora de toma de examen',
  })
  time: Date;
}
