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
import { PracticalCaseEntity } from './practical-case.entity';

@Entity('memorandum-tutors', { schema: 'uic' })
export class MemorandumTutorEntity {
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

  @ManyToOne(() => PracticalCaseEntity, (topic) => topic.topics)
  @JoinColumn({ name: 'topic_id' })
  topic: PracticalCaseEntity;

  // Fields

  @Column('varchar', {
    name: 'type',
    comment: 'Tipo de Memorando',
  })
  type: string;

  @Column('date', {
    name: 'date_written',
    comment: 'Fecha de redacción del memorando',
  })
  dateWritten: Date;
}
