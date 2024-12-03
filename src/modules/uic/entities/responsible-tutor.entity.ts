import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { EstudianteEntity } from '@uic/entities';

@Entity('responsible_tutors', { schema: 'uic' })
export class ResponsibleTutorEntity {
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

  @ManyToOne(() => EstudianteEntity, (nameStudent) => nameStudent.estudiante)
  @JoinColumn({ name: 'nameStudent_id' })
  nameStudent: EstudianteEntity;

  @ManyToOne(() => EventEntity, (dateEvent) => dateEvent.dateEvents)
  @JoinColumn({ name: 'dateEvent_id' })
  dateEvent: EventEntity;

  // Fields

  @Column('boolean', {
    name: 'state',
    comment: 'proyecto proceso,proyecto terminado, proyecto reprobado',
  })
  approved: boolean;

  @Column('text', {
    name: 'observation',
    comment: 'Observacion despues de revisar el documento del proyecto',
  })
  observation: string;

  @Column('integer', {
    name: 'score',
    comment: 'Calificacion del proyecto despues de la revision',
  })
  score: number;

  @Column('timestamp', {
    name: 'date',
    comment: '',
  })
  date: Date;

  // @BeforeInsert()
  // @BeforeUpdate()
  // setname() {
  //   if (!this.name) {
  //     return;
  //   }
  // this.name= this.name.toUpperCase().trim()
  // }
}
