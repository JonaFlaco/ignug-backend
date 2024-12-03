import { PlanningEntity } from '@uic/entities';
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
import { StatusEnum } from '../enums';

@Entity('review_requirements', { schema: 'uic' })
export class ReviewRequirementEntity {
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
  @ManyToOne(() => PlanningEntity, (planning) => planning.reviews)
  @JoinColumn({ name: 'planning_id' })
  planning: ReviewRequirementEntity;

  @Column('timestamp', {
    name: 'registeredAt',
    comment: 'Fecha de Registro de la carga de archivos',
  })
  registeredAt: Date;

  @Column('enum', {
    name: 'status',
    enum: StatusEnum,
    comment: 'Estado del requerimiento(Active,Inactive,Waiting)',
  })
  status: StatusEnum;

  @Column('text', {
    name: 'description',
    comment: 'El documento esta borroso',
  })
  description: string;

  @Column('varchar', {
    name: 'file',
    nullable: true,
    comment: 'Descarga de archivos ',
  })
  file: string;
}
