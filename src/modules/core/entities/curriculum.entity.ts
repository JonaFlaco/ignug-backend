import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CareerEntity, CatalogueEntity } from '@core/entities';

@Entity('curricula', { schema: 'core' })
export class CurriculumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'ended_At',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  endedAt: Date;

  @CreateDateColumn({
    name: 'started_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  startedAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAT: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAT: Date;

  @ManyToOne(() => CareerEntity, { nullable: false })
  career: CareerEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: false })
  state: CatalogueEntity;

  @Column({
    name: 'code',
    type: 'varchar',
    default: 'SN',
    comment: 'Codigo de la malla',
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    default: 'SN',
    comment: 'Nombre de la malla',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    default: 'SN',
    comment: 'Descripcion de la mall',
  })
  description: string;

  @Column({
    name: 'resolution_number',
    type: 'varchar',
    default: 'SN',
    comment: 'Numero de resolucion',
  })
  resolutionNumber: string;

  @Column({
    name: 'periodic_academic_number',
    type: 'int',
    comment: 'numero de periodos academmicos',
  })
  periodicAcademicNumber: number;

  @Column({
    name: 'weeks_Number',
    type: 'int',
    comment: 'Numeros de semanas',
  })
  weeksNumber: number;
}
