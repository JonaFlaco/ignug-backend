import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  CatalogueEntity,
  InstitutionEntity,
  TeacherEntity,
} from '@core/entities';
import {
  PlanningEntity,
  PreparationCourseEntity,
  UploadScoreEntity,
  UploadProjectEntity,
  RubricEntity,
  ItemEntity,
  StudentEntity,
} from '@uic/entities';

@Entity('careers', { schema: 'core' })
export class CareerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  //FK UIC

  @OneToMany(() => StudentEntity, (student) => student.career)
  student: StudentEntity;

  @OneToMany(() => PlanningEntity, (planning) => planning.career)
  planning: PlanningEntity[];

  @OneToMany(() => RubricEntity, (rubric) => rubric.career)
  rubric: RubricEntity[];

  @OneToMany(() => ItemEntity, (item) => item.career)
  item: ItemEntity[];

  @OneToMany(
    () => PreparationCourseEntity,
    (preparationCourse) => preparationCourse.career,
  )
  preparationCourse: PreparationCourseEntity[];

  //FK UIC
  @OneToMany(() => UploadScoreEntity, (score) => score.nameCareer)
  score: UploadScoreEntity[];

  @OneToMany(() => UploadProjectEntity, (project) => project.nameCareer)
  project: UploadProjectEntity[];

  @ManyToOne(() => InstitutionEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'modality_id' })
  modality: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  // Fk de teacher
  @OneToMany(() => TeacherEntity, (teacher) => teacher.career)
  teacher: TeacherEntity[];

  @Column('varchar', {
    name: 'acronym',
    comment: 'Acronimo de la carrera Ej. DS, MKT, GN',
  })
  acronym: string;

  @Column('varchar', {
    name: 'code',
    comment: 'Codigo de la carrera',
  })
  code: string;

  @Column('varchar', {
    comment: 'Codigo sniese de la carrera',
    name: 'code_sniese',
  })
  codeSniese: string;

  @Column('varchar', {
    name: 'degree',
    comment: 'Titulo que otorga la carrera',
  })
  degree: string;

  @Column('varchar', {
    name: 'logo',
    nullable: true,
    comment: 'Logo de la carrera',
  })
  logo: string;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre de la carrera',
  })
  name: string;

  // @Column('varchar', {
  //   name: 'resolution_number',
  //   comment: 'Numero de resolucion de la carrera',
  // })
  // resolutionNumber: string;

  @Column('varchar', {
    name: 'short_name',
    comment: 'Nombre corto de la carrera',
  })
  shortName: string;
}
