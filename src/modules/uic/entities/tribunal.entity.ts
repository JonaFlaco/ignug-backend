import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { TeacherEntity } from '@uic/entities';

@Entity('tribunals', { schema: 'uic' })
export class TribunalEntity {
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
  @ManyToOne(() => EstudianteEntity, (name) => name.estudiantes)
  @JoinColumn({ name: 'name_id' })
  name: EstudianteEntity;

  @ManyToOne(() => TeacherEntity, (tutor) => tutor.teachers)
  @JoinColumn({ name: 'teacher_id' })
  tutor: TeacherEntity;

  @ManyToOne(() => TeacherEntity, (president) => president.teachers)
  @JoinColumn({ name: 'president_id' })
  president: TeacherEntity;

  @ManyToOne(() => TeacherEntity, (vocal) => vocal.teachers)
  @JoinColumn({ name: 'vocal_id' })
  vocal: TeacherEntity;

  //Fields

  @Column('timestamp', {
    name: 'date',
    comment: 'Fecha de la defensa',
  })
  date: Date;

  @Column('integer', {
    name: 'score',
    comment: 'Nota del tribunal',
  })
  score: number;

  @Column('integer', {
    name: 'score2',
    comment: 'Nota del tribunal',
  })
  score2: number;

  @Column('integer', {
    name: 'score3',
    comment: 'Nota del tribunal',
  })
  score3: number;

  @Column('varchar', {
    name: 'place',
    comment: 'Lugar donde hara la defensa',
  })
  place: string;

  @BeforeInsert()
  @BeforeUpdate()
  setPlace() {
    if (!this.place) {
      return;
    }
    this.place = this.place.toUpperCase().trim();
  }
}
