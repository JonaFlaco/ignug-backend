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
import { RubricEntity } from './rubric.entity';
import { StudentEntity, TeacherEntity } from '@core/entities';
import { RubricNoteEntity } from './rubric-note.entity';
import { DefenseApprovedEntity } from './defense-approved.entity';
import { TotalCaseEntity } from './total-case.entity';

@Entity('note-defense', { schema: 'uic' })
export class NoteDefenseEntity {
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

  @OneToOne(() => StudentEntity, (nameStudent) => nameStudent.defense)
  @JoinColumn({ name: 'student_id' })
  nameStudent: StudentEntity;

  // @OneToOne(() => RubricNoteEntity, (score) => score.defense)
  // @JoinColumn({ name: 'score_id' })
  // score: RubricNoteEntity;

  @OneToOne(() => DefenseApprovedEntity, (approved) => approved.rating)
  approved: DefenseApprovedEntity[];

  @OneToOne(() => TotalCaseEntity, (total) => total.defense)
  total: TotalCaseEntity[];
}
