import { UserEntity } from '@auth/entities';
import {
  EnrollmentEntity,
  MemorandumEntity,
  NoteSettingEntity,
  RubricEntity,
  TotalCaseEntity,
} from '@uic/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CareerEntity } from './career.entity';
import { InformationStudentEntity } from './information-student.entity';
import { RubricNoteEntity } from 'src/modules/uic/entities/rubric-note.entity';
import { NoteDefenseEntity } from 'src/modules/uic/entities/note-defense.entity';
import { DefenseApprovedEntity } from 'src/modules/uic/entities/defense-approved.entity';

@Entity('students', { schema: 'core' })
export class StudentEntity {
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

  //Relations

  /** Inverse Relationship **/
  @OneToOne(() => InformationStudentEntity)
  @JoinColumn({ name: 'student' })
  informationStudent: InformationStudentEntity;

  /** Relationship **/
  @OneToOne(() => UserEntity, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CareerEntity, (career) => career.student)
  @JoinColumn({ name: 'career' })
  career: CareerEntity;

  /** Columns **/
  @Column({ name: 'name', type: 'varchar', comment: 'Nombre del estudiante' })
  name: string;

  @Column('numeric', {
    name: 'identification_card',
    comment: 'Es la cedúla del Estudiante',
  })
  identification_card: number;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.student)
  enrollments: EnrollmentEntity[];

  @OneToMany(() => MemorandumEntity, (memorandum) => memorandum.nameStudent)
  students: MemorandumEntity[];

  @OneToMany(() => RubricNoteEntity, (note) => note.student)
  note: RubricNoteEntity[];

  @OneToOne(() => NoteSettingEntity, (setting) => setting.student)
  setting: NoteSettingEntity[];

  @OneToOne(() => NoteDefenseEntity, (defense) => defense.nameStudent)
  defense: NoteDefenseEntity[];

  @OneToMany(() => RubricEntity, (rubric) => rubric.nameStudent)
  rubric: RubricEntity[];

  @OneToOne(() => DefenseApprovedEntity, (approved) => approved.student)
  approved:DefenseApprovedEntity[];

  @OneToOne(() => TotalCaseEntity, (total) => total.student)
  total:TotalCaseEntity[];
}
