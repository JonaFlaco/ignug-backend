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
import { CatalogueEntity, StudentEntity } from '@core/entities';

@Entity('information_students', { schema: 'core' })
export class InformationStudentEntity {
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
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  /** Relationship **/
  @OneToOne(() => StudentEntity, (student) => student.informationStudent)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_practice' })
  isExecutedPractice: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_community' })
  isExecutedCommunity: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_disability' })
  isDisability: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_lost_Gratuity' })
  isLostGratuity: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_subject_repeat' })
  isSubjectRepeat: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'address',
    type: 'text',
    comment: 'La direccion donde reside el estudiante',
  })
  address: string;

  @Column({
    name: 'community',
    type: 'int',
    comment:
      'Las horas realizadas por parte del estudiante en integracion con la sociedad',
  })
  community: number;

  @Column({
    name: 'contact_emergency_name',
    type: 'varchar',
    comment:
      'Nombre del contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyName: string;

  @Column({
    name: 'contact_emergency_kinship',
    type: 'varchar',
    comment:
      'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante',
  })
  contactEmergencyKinship: string;

  @Column({
    name: 'contact_emergency_phone',
    type: 'varchar',
    comment:
      'Numeros de contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyPhone: string;

  @Column({
    name: 'disability_percentage',
    type: 'float',
    comment: 'El porcentaje de discapicidad que tiene el estudiante ',
  })
  disabilityPercentage: number;

  @Column({
    name: 'economic_amount',
    type: 'float',
    comment: 'El monto de ayuda economica que el estudiante recibe',
  })
  economicAmount: number;

  @Column({
    name: 'educational_amount',
    type: 'float',
    comment: 'El monto de credito que el estudiante tiene',
  })
  educationalAmount: number;

  @Column({
    name: 'family_income',
    type: 'float',
    comment: 'La direccion donde reside el estudiante',
  })
  familyIncome: number;

  @Column({
    name: 'financing_scholarship_type',
    type: 'varchar',
    comment: 'Recibe el estudiante un financiamiento si =1, no = 2',
  })
  financingScholarshipType: string;

  @Column({
    name: 'members_house_number',
    type: 'int',
    comment: 'Numero de familiares con quien vive el estudiante',
  })
  membersHouseNumber: number;

  @Column({
    name: 'practice_hours',
    type: 'int',
    comment: 'Las horas realizadas por parte del estudiante en pasantias',
  })
  practiceHours: number;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    comment: 'Codigo postal donde el estudiante reside',
  })
  postalCode: string;

  @Column({
    name: 'scholarship_amount',
    type: 'float',
    comment: 'El monto de beca que el estudiante obtuvo',
  })
  scholarshipAmount: number;

  @Column({
    name: 'tariff_scholarship_percentage',
    type: 'float',
    comment: 'El porcentaje de beca que cubre la institutcion el estudiante ',
  })
  tariffScholarshipPercentage: number;
}
