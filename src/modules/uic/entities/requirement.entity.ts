import {
  BeforeInsert,
  BeforeUpdate,
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
import {
  CatalogueEntity,
  MeshStudentRequirementEntity,
  PlanningEntity,
  RequirementRequestEntity,
} from '@uic/entities';
import { StatusEnum } from '../enums';
@Entity('requirements', { schema: 'uic' })
export class RequirementEntity {
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

  //Relationship

  @OneToMany(
    () => RequirementRequestEntity,
    (requirementRequest) => requirementRequest.name,
  )
  requirementRequests: RequirementRequestEntity[];

  @OneToMany(
    () => MeshStudentRequirementEntity,
    (meshStudentRequirement) => meshStudentRequirement.requirement,
  )
  meshStudentRequirements: MeshStudentRequirementEntity[];

  @ManyToOne(() => CatalogueEntity, (nameCatalogue) => nameCatalogue.catalogues)
  @JoinColumn({ name: 'nameCatalogue_id' })
  nameCatalogue: CatalogueEntity;

  @ManyToOne(() => PlanningEntity, (planning) => planning.requirements)
  @JoinColumn({ name: 'planning_id' })
  planning: PlanningEntity;
  //Fields

  @Column('text', {
    name: 'description',
    comment: 'Indicaciones del requerimiento',
    nullable: true,
  })
  description: string;

  // @Column('varchar', {
  //   name: 'name',
  //   comment: 'Nombre del requerimiento',
  // })
  // name: string;

  // @Column('boolean', {
  //   name: 'required',
  //   comment: 'True si el documento es requerido y False si no lo es',
  // })
  // required: boolean;

  @Column('enum', {
    name: 'status',
    enum: StatusEnum,
    comment: 'Estado del requerimiento(Active,Inactive,Waiting)',
  })
  status: StatusEnum;

  @BeforeInsert()
  async setCode() {
    if (this.status == null) {
      this.status = StatusEnum.WAITING;
    }
  }
}
