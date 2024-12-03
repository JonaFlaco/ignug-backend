import { File } from 'src/shared/models/file.model';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ModalityEntity } from './modality.entity';
import { PlanningEntity } from './planning.entity';
import { EstudianteEntity } from './estudiante.entity';
import { InscriptionEntity } from './inscription.entity';

@Entity('students_degree', { schema: 'uic' })
export class StudentDegreeEntity {
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

  @ManyToOne(() => EstudianteEntity, (nameEstudiante) => nameEstudiante.name)
  @JoinColumn({ name: 'estudiante_id' })
  nameEstudiante: EstudianteEntity;

  @ManyToOne(() => ModalityEntity, (nameModality) => nameModality.name)
  @JoinColumn({ name: 'modality_id' })
  nameModality: PlanningEntity;

  //@ManyToOne(() => ModalityEntity, (modalities) => modalities.modalities)
  //@JoinColumn({ name: 'modality_id' })
  //modalities: ModalityEntity;

  //@ManyToOne(() => PlanningEntity, (plannings) => plannings.plannings)
  //@JoinColumn({ name: 'planning_id' })
  //plannings: PlanningEntity;

  @ManyToOne(() => PlanningEntity, (namePlanning) => namePlanning.name)
  @JoinColumn({ name: 'planning_id' })
  namePlanning: PlanningEntity;

  //FK

  //Fields

  @Column('text', {
    name: 'observation',
    comment: 'Observacion  ',
  })
  observation: string;

  @Column('varchar', {
    name: 'title',
    comment: 'Titulo del anteproyecto',
  })
  title: string;

  @Column('boolean', {
    name: 'state',
    comment: 'Es el estado de los requisitos',
  })
  state: boolean;

  @Column('text', {
    name: 'requerimientos',
    comment: 'Requerimientos  ',
  })
  requerimientos: string;

  @Column('text', {
    name: 'file',
    comment: 'Nombre del Archivo  ',
  })
  file: string;

  @Column('text', {
    name: 'type_request',
    comment: 'Tipo de Solicitud  ',
  })
  type_request: string;

  @Column('text', {
    name: 'url',
    comment: 'Url ',
  })
  url: string;

  @Column('text', {
    name: 'dni',
    comment: 'Cedula del estudiante ',
  })
  dni: string;
}
