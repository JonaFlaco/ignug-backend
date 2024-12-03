import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CareerEntity } from '@core/entities';

@Entity('upload_scores', { schema: 'uic' })
export class UploadScoreEntity {
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

  //FK CAREER CORE
  @ManyToOne(() => CareerEntity, (nameCareer) => nameCareer.score)
  @JoinColumn({ name: 'nameCareer_id' })
  nameCareer: CareerEntity;

  // Fields
  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del estudainte',
  })
  name: string;

  @Column('varchar', {
    name: 'dni',
    comment: 'Cedula del estudiante',
  })
  dni: string;

  @Column('integer', {
    name: 'score',
    comment: 'Puntaje del examen complexivo',
  })
  score: number;

  // @BeforeInsert()
  // @BeforeUpdate()
  // setname() {
  //   if (!this.name) {
  //     return;
  //   }
  //   this.name = this.name.toUpperCase().trim();
  // }
}
