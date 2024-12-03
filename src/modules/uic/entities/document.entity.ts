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
import { YearEntity } from '@core/entities';
import { InscriptionEntity } from './inscription.entity';
import { UploadRequirementRequestEntity } from './upload-requirement-request.entity';
@Entity('documents', { schema: 'uic' })
export class DocumentEntity {
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

  @ManyToOne(
    () => UploadRequirementRequestEntity,
    //(uploadRequirementRequest) => uploadRequirementRequest.cedula,
  )
  @JoinColumn({ name: 'cedula_id' })
  cedula: UploadRequirementRequestEntity;

  @ManyToOne(
    () => UploadRequirementRequestEntity,
    //(uploadRequirementRequest) => uploadRequirementRequest.estudiante,
  )
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: UploadRequirementRequestEntity;

  //Fields

  @Column('varchar', {
    name: 'observation',
    comment: 'una observacion rapida',
  })
  observation: string;
}
