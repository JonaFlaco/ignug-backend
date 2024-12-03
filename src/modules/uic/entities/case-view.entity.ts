import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('case_views', { schema: 'uic' })
export class CaseViewEntity {
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

  //Fields

  @Column('varchar', {
    name: 'activity',
    comment: 'Actividad de la tutoria',
    nullable: true,
  })
  activity: string;

  @Column('date', {
    name: 'meeting_date',
    comment: 'Fecha de la tutoria',
    nullable: true,
  })
  meetingDate: Date;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripción de la tutoria',
    nullable: true,
  })
  description: string;
}
