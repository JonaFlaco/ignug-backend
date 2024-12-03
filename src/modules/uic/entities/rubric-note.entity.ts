import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';
import { RubricEntity } from './rubric.entity';
import { StudentEntity, TeacherEntity } from '@core/entities';
import { NoteDefenseEntity } from './note-defense.entity';

@Entity('rubric-notes', { schema: 'uic' })
export class RubricNoteEntity {
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

  @ManyToOne(() => RubricEntity, (rubric) => rubric.note)
  @JoinColumn({ name: 'rubric_id' })
  rubric: RubricEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.note)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => StudentEntity, (student) => student.note)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @OneToOne(() => NoteDefenseEntity, (defense) => defense.nameStudent)
  defense: NoteDefenseEntity[];

  // @OneToOne(() => NoteDefenseEntity, (defense) => defense.score)
  // score: NoteDefenseEntity[];

  @Column('numeric', {
    name: 'note',
    //unique: true,
    comment: 'Nota del examén teórico',
  })
  note: number;
}
