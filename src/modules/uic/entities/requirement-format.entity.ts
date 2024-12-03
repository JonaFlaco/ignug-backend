import {
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
import { ModalityEntity } from './modality.entity';
import { ProfessionEntity } from './profession.entity';

@Entity('requirement_formats', { schema: 'uic' })
export class RequirementFormatEntity {
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

  @ManyToOne(() => ModalityEntity, (nameModality) => nameModality.name)
  @JoinColumn({ name: 'modality_id' })
  nameModality: ModalityEntity;

  @ManyToOne(() => ProfessionEntity, (nameProfession) => nameProfession.career)
  @JoinColumn({ name: 'profession_id' })
  nameCareer: ProfessionEntity;

  // Fields
  @Column('varchar', {
    name: 'name_format',
    unique: true,
    comment: 'El nombre del formato que el uic de carrera piensa subir',
  })
  nameFormat: string;

  @Column('boolean', {
    name: 'required_format',
    default: false,
    comment: 'True= Si el documento es obligatrio, False=Si es opcional',
  })
  requiredFormat: boolean;

  @Column('varchar', {
    name: 'filename',
    comment: 'El nombre del archivo que el uic de carrera sube',
  })
  filename: string;
}
