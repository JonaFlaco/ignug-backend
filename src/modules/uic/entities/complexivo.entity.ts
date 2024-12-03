import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { TeacherEntity } from '@uic/entities';

@Entity('complexivo', { schema: 'uic' })
export class ComplexivoEntity {
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
  @ManyToOne(() => EstudianteEntity, (name) => name.estudiantes2)
  @JoinColumn({ name: 'name_id' })
  name: EstudianteEntity;

  @ManyToOne(() => EstudianteEntity, (name2) => name2.estudiantes3)
  @JoinColumn({ name: 'name2_id' })
  name2: EstudianteEntity;
  
  @ManyToOne(() => TeacherEntity, (tutor) => tutor.teacherss)
  @JoinColumn({ name: 'teacher_id' })
  tutor: TeacherEntity;
  
  @ManyToOne(() => TeacherEntity, (president) => president.teacherss)
  @JoinColumn({ name: 'president_id' })
  president: TeacherEntity;

  @ManyToOne(() => TeacherEntity, (vocal) => vocal.teacherss)
  @JoinColumn({ name: 'vocal_id' })
  vocal: TeacherEntity;

  //Fields
  @Column('varchar', {
    name: 'name_case',
    comment: 'Nombre del caso (proyecto a presetar)',
  })
  nameCase: string;

}
