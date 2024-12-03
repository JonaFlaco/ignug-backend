import { EstudianteEntity, PlanningEntity } from '@uic/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('evaluation', { schema: 'uic' })
export class EvaluationEntity {
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
  @ManyToOne(() => EstudianteEntity, (student) => student.evaluation)
  @JoinColumn({ name: 'student' })
  student: EstudianteEntity;

  // Fields
  @Column('numeric', {
    name: 'note',
    //unique: true,
    comment: 'Esta convocatoria es solo para egresados',
  })
  note: number;
}
