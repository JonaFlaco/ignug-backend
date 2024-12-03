import { CareerEntity, StudentEntity } from '@core/entities';
import { ItemEntity, TotalCaseEntity } from '@uic/entities';

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
  OneToOne,
} from 'typeorm';

@Entity('note-settings', { schema: 'uic' })
export class NoteSettingEntity {
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

  @OneToOne(() => StudentEntity, (student) => student.setting)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @OneToOne(() => TotalCaseEntity, (total) => total.setting)
  total: TotalCaseEntity[];

  //Fields
  @Column('integer', {
    name: 'evaluation',
    comment: 'Nota de la evaluacion continua por parte del tutor',
  })
  evaluation: number;

  @Column('integer', {
    name: 'document',
    comment: 'Nota del documento(Sow) por parte del tutor',
  })
  document: number;
}
