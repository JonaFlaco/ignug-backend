import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity, TeacherEntity } from '@core/entities';

@Entity('information_teachers', { schema: 'core' })
export class InformationTeacherEntity {
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

  /** Relationship **/
  @OneToOne(() => TeacherEntity, (teacher) => teacher.informationTeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'country_higher_education_id' })
  countryHigherEducation: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'dedication_time_id' })
  dedicationTime: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'financing_type_id' })
  financingType: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'higher_education_id' })
  higherEducation: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'scholarship_id' })
  scholarship: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'scholarship_type_id' })
  scholarshipType: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'teaching_ladder_id' })
  teachingLadder: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'academic_unit',
    type: 'varchar',
    comment: 'Nombre de la unidad academica',
  })
  academicUnit: string;

  @Column({
    name: 'administrative_hours',
    type: 'float',
    unsigned: true,
    comment: 'Horas dedicadas a la administracion al mes',
  })
  administrativeHours: number;

  @Column({
    name: 'class_hours',
    type: 'float',
    unsigned: true,
    comment: 'Total de horas de clase dadas',
  })
  classHours: number;

  @Column({
    name: 'community_hours',
    type: 'float',
    unsigned: true,
    comment: 'Horas dedicadas a labores comunitarios',
  })
  communityHours: number;

  @Column({
    name: 'degree_higher_education',
    type: 'varchar',
    comment: 'Que grado de educación superior tiene el usuario',
  })
  degreeHigherEducation: string;

  @Column({
    name: 'hours_worked',
    type: 'float',
    unsigned: true,
    comment: 'Total de las horas trabajadas al mes',
  })
  hoursWorked: number;

  @Column({
    nullable: true,
    type: 'date',
    name: 'holidays',
    comment: 'Fecha de los dias festivos.',
  })
  holidays: Date;

  @Column({
    nullable: true,
    type: 'date',
    name: 'home_vacation',
    comment: 'Fecha para las vacacines',
  })
  homeVacation: Date;

  @Column({
    name: 'institution_higher_education',
    type: 'varchar',
    comment: 'Nombre de la institución de educación superior',
  })
  institutionHigherEducation: string;

  @Column({
    name: 'investigation_hours',
    type: 'float',
    unsigned: true,
    comment: 'Horas de investigacion al mes',
  })
  investigationHours: number;

  @Column({
    name: 'other_hours',
    type: 'float',
    comment: 'Horas dedicadas a otras actividades',
  })
  otherHours: number;

  @Column({
    name: 'publications',
    type: 'varchar',
    unsigned: true,
    comment: 'Revisar publicacion',
  })
  publications: string;

  @Column({
    name: 'scholarship_amount',
    type: 'float',
    unsigned: true,
    comment: 'Precio de la beca a pagar',
  })
  scholarshipAmount: number;

  @Column({
    name: 'total_subjects',
    type: 'int',
    unsigned: true,
    comment: 'Total de personas en la academia',
  })
  totalSubjects: number;

  @Column({
    name: 'technical',
    type: 'varchar',
    comment: 'nombre de la tecnica a usar',
  })
  technical: string;

  @Column({
    name: 'technology',
    type: 'varchar',
    comment: 'nombres de las salas de tecnologia',
  })
  technology: string;

  @Column({
    name: 'total_publications',
    type: 'int',
    unsigned: true,
    comment: 'Total de las publicaciones realizadas hasta el momento',
  })
  totalPublications: number;
}
