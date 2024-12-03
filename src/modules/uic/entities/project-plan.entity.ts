import { UserEntity } from '@auth/entities';
import { TeacherEntity, StudentEntity } from '@core/entities';
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

@Entity('project_plans', { schema: 'uic' })
export class ProjectPlanEntity {
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

  // Fields

  @Column('varchar', {
    name: 'title',
    comment: 'Tema del Anteproyecto',
  })
  title: string;

  @ManyToOne(() => UserEntity, (oUserEntity: UserEntity) => oUserEntity, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'student_id',
  })
  student: string;

  @Column('timestamp', {
    name: 'requested_at',
    comment: '',
  })
  requestedAt: Date;

  @Column('timestamp', {
    name: 'answered_at',
    comment: '',
    nullable: true,
  })
  answeredAt?: Date;

  @Column('varchar', {
    name: 'observation',
    comment: '',
    nullable: true,
  })
  observation?: string;

  @Column('varchar', {
    name: 'state',
    comment: '',
    nullable: true,
  })
  state?: string;

  @ManyToOne(() => TeacherEntity, (oTeacherEntity) => oTeacherEntity, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: 'tutor_id',
  })
  tutor?: TeacherEntity;

  @ManyToOne(() => StudentEntity, (oStudentEntity) => oStudentEntity, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: 'student_select_id',
  })
  studentSelect?: StudentEntity;

  @Column({
    name: 'request_file',
    transformer: {
      to: (value) => {
        return value ? value.toString('base64') : value;
      },
      from: (value) => {
        return value ? Buffer.from(value, 'base64') : value;
      },
    },
    nullable: true,
  })
  requestFile?: string;

  @Column('varchar', {
    name: 'name_requestFile',
    comment: '',
    nullable: true,
  })
  nameRequestFile?: string;

  @Column({
    name: 'proyectPlan_file',
    transformer: {
      to: (value) => {
        return value ? value.toString('base64') : value;
      },
      from: (value) => {
        return value ? Buffer.from(value, 'base64') : value;
      },
    },
    nullable: true,
  })
  proyectPlanFile?: string;

  @Column('varchar', {
    name: 'name_proyectPlanFile',
    comment: '',
    nullable: true,
  })
  nameProyectPlanFile?: string;
}
