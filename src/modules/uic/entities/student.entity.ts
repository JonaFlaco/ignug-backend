import { TheoricalNoteEntity } from './theoretical-note.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students', { schema: 'uic' })
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
  @OneToMany(() => StudentEntity, (student) => student.nameStudent)
  nameStudent: StudentEntity;

  @OneToMany(() => StudentEntity, (student) => student.careerStudent)
  careerStudent: StudentEntity;

  // @OneToMany(
  //   () => TheoricalNoteEntity,
  //   (theoricalNote) => theoricalNote.student,
  // )
  // theoricalNote: TheoricalNoteEntity;

  // Fields
  @Column('text', {
    name: 'name',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  name: string;

  @Column('text', {
    name: 'career',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  career: string;

  @Column('text', {
    name: 'ethnicity',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  ethnicity: string;

  @Column('text', {
    name: 'email',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  email: string;

  @Column('numeric', {
    name: 'cellphone',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  cellphone: number;

  @Column('numeric', {
    name: 'identification_card',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  identification_card: number;

  @Column('numeric', {
    name: 'gender',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  gender: string;
}
