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
import { DocumentEntity } from './document.entity';
import { PlanningEntity } from './planning.entity';
import { TeacherEntity } from './teacher.entity';

@Entity('registers', { schema: 'uic' })
export class RegisterEntity {
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
  //Fields

  @Column('varchar', {
    name: 'name',
    // unique:true,
    comment: 'nombre del registro',
  })
  name: string;

  @Column('numeric', {
    name: 'hours',
    comment: 'Orden ',
  })
  hours: number;
  @Column('timestamp', {
    name: 'date',
    comment: 'Registro del evento',
  })
  date: Date;
}
