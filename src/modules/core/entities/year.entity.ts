import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {
  DocumentEntity,
  PlanningEntity,
  PreparationCourseEntity,
} from '@uic/entities';

@Entity('years', { schema: 'uic' })
export class YearEntity {
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

 
  @OneToMany(() => PlanningEntity, (planning) => planning.year)
  planning: PlanningEntity[];

  @OneToMany(
    () => PreparationCourseEntity,
    (preparationCourse) => preparationCourse.year,
  )
  preparationCourse: PreparationCourseEntity[];

  //Fields

  @Column('varchar', {
    name: 'year',
    // unique:true,
    comment: 'año lectivo',
  })
  year: string;


}
