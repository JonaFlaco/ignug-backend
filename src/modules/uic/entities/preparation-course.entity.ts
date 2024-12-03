import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PlanningEntity, SignatureEntity } from '@uic/entities';
import { CareerEntity, YearEntity } from '@core/entities';

@Entity('preparation-course', { schema: 'uic' })
export class PreparationCourseEntity {
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

  //FK
  @ManyToOne(() => YearEntity, (year) => year.preparationCourse)
  @JoinColumn({ name: 'year_id' })
  year: YearEntity;

  @ManyToOne(() => CareerEntity, (career) => career.preparationCourse)
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @OneToMany(() => SignatureEntity, (signature) => signature.preparationCourse)
  signatures: SignatureEntity[];

  @ManyToOne(() => PlanningEntity, (planning) => planning.planningName)
  @JoinColumn({ name: 'planning_id' })
  planningName: PlanningEntity;

  //Fields
  @Column('varchar', {
    name: 'name',
    comment: 'Nombre',
  })
  name: string;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Inicio del evento',
  })
  startDate: Date;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fin del evento',
  })
  endDate: Date;

  @Column('varchar', {
    name: 'description',
    comment: 'Una pequeña descripcion',
  })
  description: string;

  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }
}
