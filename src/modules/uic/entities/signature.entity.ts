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
import { PreparationCourseEntity } from '.';

import { SignatureCatEntity, TeacherEntity } from '@core/entities';

@Entity('signatures', { schema: 'uic' })
export class SignatureEntity {
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

  @ManyToOne(() => TeacherEntity, (tutor) => tutor.teacherS)
  @JoinColumn({ name: 'teacher_id' })
  tutor: TeacherEntity;

  @ManyToOne(
    () => PreparationCourseEntity,
    (preparationCourse) => preparationCourse.signatures,
  )
  @JoinColumn({ name: 'preparationCourse_id' })
  preparationCourse: PreparationCourseEntity;

  @ManyToOne(() => SignatureCatEntity, (signature) => signature.signature)
  @JoinColumn({ name: 'signature_id' })
  signature: SignatureCatEntity;

  //Fields
  name: string;
  @Column('numeric', {
    name: 'hours',
    comment: 'Orden de las fases',
  })
  hours: number;
  @Column('timestamp', {
    name: 'start_date',
    comment: 'Inicio del evento',
  })
  startDate: Date;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fin del evento',
  })
  endDate: Date;
}
