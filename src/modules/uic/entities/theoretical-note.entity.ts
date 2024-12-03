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
import { EnrollmentEntity } from './enrollment.entity';

@Entity('theorical-notes', { schema: 'uic' })
export class TheoricalNoteEntity {
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

  @ManyToOne(() => EnrollmentEntity, (name) => name.theorical)
  @JoinColumn({ name: 'name_id' })
  name: EnrollmentEntity;

  // Fields
  // @Column('varchar', {
  //   name: 'name',
  //   //unique: true,
  //   comment: 'Nota del examén teórico',
  // })
  // name: string;

  @Column('numeric', {
    name: 'note',
    //unique: true,
    comment: 'Nota del examén teórico',
  })
  note: number;

  @Column('varchar', {
    name: 'observations',
    //unique: true,
    comment: 'Observacion de la calificación',
  })
  observations: string;
}
