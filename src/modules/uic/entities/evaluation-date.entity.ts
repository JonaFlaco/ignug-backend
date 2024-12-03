import {
  ComplexivoEntity,
  EstudianteEntity,
  SignatureEntity,
  TribunalEntity,
  TutorAssignmentEntity,
} from '@uic/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('evaluationDates', { schema: 'uic' })
export class EvaluationDateEntity {
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
    name: 'dni',
    comment: 'Cedula del tutor (base de datos)',
  })
  dni: string;

  @Column('varchar', {
    name: 'tutor',
    comment: 'Nombre del tutor (base de datos)',
  })
  tutor: string;
}
