import { State } from 'joi';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CatalogueEntity } from './catalogue.entity';
import { ProjectPlanEntity } from './project-plan.entity';
import { TeacherEntity } from './teacher.entity';

@Entity('response_project_plans', { schema: 'uic' })
export class ResponseProjectPlanEntity {
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

  // Fields

  @Column('varchar', {
    name: 'observation',
    comment: 'El tutor escribirá un comentario de ser necesario',
  })
  observation: string;

  // @ManyToOne(() => TeacherEntity, (oTeacherEntity) => oTeacherEntity, {
  //   eager: true,
  //   nullable: true,
  // })
  // @JoinColumn({
  //   name: 'tutor',
  // })
  @Column('varchar', {
    name: 'tutor',
    comment: 'Tutor asigando',
  })
  tutor: string;

  // @ManyToOne(() => CatalogueEntity, (oCatalogueEntity) => oCatalogueEntity, {
  //   eager: true,
  //   nullable: true,
  // })
  // @JoinColumn({
  //   name: 'state',
  // })
  @Column('varchar', {
    name: 'state',
    comment: 'Estado de la solicitud',
  })
  state: string;

  @ManyToOne(() => ProjectPlanEntity, (oProyectPlan) => oProyectPlan, {
    eager: true,
  })
  proyectPlan: ProjectPlanEntity;
}
