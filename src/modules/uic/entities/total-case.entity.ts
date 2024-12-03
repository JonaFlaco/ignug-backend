import { StudentEntity } from '@core/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { NoteSettingEntity } from './note-setting.entity';
import { NoteDefenseEntity } from './note-defense.entity';

@Entity('total-cases', { schema: 'uic' })
export class TotalCaseEntity {
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

  @OneToOne(() => StudentEntity, (student) => student.total)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @OneToOne(() => NoteSettingEntity, (setting) => setting.total)
  @JoinColumn({ name: 'setting_id' })
  setting: NoteSettingEntity;

  @OneToOne(() => NoteDefenseEntity, (defense) => defense.total)
  @JoinColumn({ name: 'defense_id' })
  defense: NoteDefenseEntity;


}
