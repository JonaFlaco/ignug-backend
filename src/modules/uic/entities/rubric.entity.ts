import { CareerEntity, StudentEntity } from '@core/entities';
import { ItemEntity } from '@uic/entities';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  AfterInsert,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { RubricNoteEntity } from './rubric-note.entity';

@Entity('rubrics', { schema: 'uic' })
export class RubricEntity {
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

  @ManyToMany(() => ItemEntity, (item) => item.rubrics, { eager: true })
  item: ItemEntity[];

  //FK CAREER CORE
  @ManyToOne(() => CareerEntity, (career) => career.rubric)
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @OneToMany(() => RubricNoteEntity, (note) => note.rubric)
  note: RubricNoteEntity[];

  @ManyToOne(() => StudentEntity, (nameStudent) => nameStudent.rubric)
  @JoinColumn({ name: 'student_id' })
  nameStudent: StudentEntity;

  //Fields
  @Column('varchar', {
    name: 'criterio',
    comment: 'criterios de calificacion',
  })
  criterio: string;

  @Column('varchar', {
    name: 'criterio2',
    comment: 'criterios de calificacion',
  })
  criterio2: string;

  @Column('varchar', {
    name: 'criterio3',
    comment: 'criterios de calificacion',
  })
  criterio3: string;

  @Column('varchar', {
    name: 'criterio4',
    comment: 'criterios de calificacion',
  })
  criterio4: string;

  @Column('varchar', {
    name: 'criterio5',
    comment: 'criterios de calificacion',
  })
  criterio5: string;
}
