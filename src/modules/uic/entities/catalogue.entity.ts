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
  EnrollmentEntity,
  TutorAssignmentEntity,
  EventEntity,
  CatalogueTypeEntity,
  RequirementEntity,
} from '@uic/entities';

@Entity('catalogues', { schema: 'uic' })
export class CatalogueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @ManyToOne(() => CatalogueEntity, (category) => category.children)
  parent: CatalogueEntity;

  @OneToMany(() => CatalogueEntity, (category) => category.parent)
  children: CatalogueEntity[];

  //event
  @OneToMany(() => EventEntity, (event) => event.catalogue)
  events: EventEntity[];
  //enrollment
  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.catalogue)
  enrollments: EnrollmentEntity[];
  //tutor assignment
  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.type,
  )
  tutorAssignments: TutorAssignmentEntity[];

  //requerimiento
  @OneToMany(
    () => RequirementEntity,
    (requirement) => requirement.nameCatalogue,
  )
  catalogues: RequirementEntity[];

  @ManyToOne(
    () => CatalogueTypeEntity,
    (catalogueType) => catalogueType.catalogue,
  )
  @JoinColumn({ name: 'catalogue_type_id' })
  catalogueType: CatalogueTypeEntity;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del catalogo',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripcion del catalogo',
  })
  description: string;

  @Column('boolean', {
    name: 'state',
    default: true,
    comment: 'true=activo, false=no activo',
  })
  state: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }
}
