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
import { StudentInformationEntity } from './student-information.entity';
import { StatusEnum } from '../enums';

@Entity('inscriptions', { schema: 'uic' })
export class InscriptionEntity {
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

  @OneToMany(() => DocumentEntity, (estudiante) => estudiante.estudiante)
  estudiante: DocumentEntity[];

  @OneToMany(() => DocumentEntity, (cedula) => cedula.cedula)
  cedula: DocumentEntity[];

  @ManyToOne(
    () => StudentInformationEntity,
    (StudentInformation) => StudentInformation.inscription,
  )
  @JoinColumn({ name: 'StudentInformation_id' })
  studentInformation: StudentInformationEntity;

  //Fields

  @Column('varchar', {
    name: 'student',
    comment: 'nombre del estudiante',
  })
  student: string;

  @Column('varchar', {
    name: 'dni',
    comment: 'nombre del estudiante',
  })
  dni: string;

  @Column('boolean', {
    name: 'is_enable',
    comment: 'True= visible, False= no visible ',
  })
  isEnable: boolean;

  @Column('varchar', {
    name: 'document',
    comment: 'nombre del estudiante',
  })
  document: string;

  @Column('varchar', {
    name: 'requirement',
    comment: 'nombre del estudiante',
  })
  requirement: string;

  @Column('varchar', {
    name: 'request',
    comment: 'nombre del estudiante',
  })
  request: string;

  @Column('boolean', {
    name: 'doc_upload',
    comment: 'True= visible, False= no visible ',
  })
  docUpload: boolean;

  @Column('varchar', {
    name: 'modality',
    comment: 'modalidad de la base',
  })
  modality: string;

  @Column('varchar', {
    name: 'observation',
    comment: 'una observacion rapida',
  })
  observation: string;

  @Column('varchar', {
    name: 'state',
    //unique: true,
    comment: 'status',
  })
  status: string;
}
