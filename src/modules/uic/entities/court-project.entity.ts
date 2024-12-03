import { UploadProjectEntity } from '@uic/entities';
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

@Entity('court-projects', { schema: 'uic' })
export class CourtProjectEntity {
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

  //Relationships
  @ManyToOne(() => UploadProjectEntity, (proyect) => proyect.theme)
  @JoinColumn({ name: 'proyect_id' })
  proyect: CourtProjectEntity;

  //Fields
  @Column('varchar', {
    name: 'tribunal',
    comment: 'tribunal',
  })
  tribunal: string;

  @Column('varchar', {
    name: 'description',
    comment: 'description',
  })
  description: string;

  @Column('varchar', {
    name: 'place',
    comment: 'Lugar de la defensa',
  })
  place: string;

  @Column('timestamp', {
    name: 'defenseAt',
    comment: 'Nombre del tutor (base de datos)',
  })
  defenseAt: Date;
}
