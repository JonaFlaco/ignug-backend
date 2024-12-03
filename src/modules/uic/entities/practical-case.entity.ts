import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {
  MemorandumTutorEntity,
  StudentInformationEntity,
} from '@uic/entities';
import { TeacherEntity } from '@core/entities';
@Entity('practical-case', { schema: 'uic' })
export class PracticalCaseEntity {
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

  //FK
  @ManyToOne(() => StudentInformationEntity, (student) => student.practicalCase)
  @JoinColumn({ name: 'student_id' })
  student: StudentInformationEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.practicalCase)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @OneToMany(() => MemorandumTutorEntity, (memorandum) => memorandum.topic)
  topics: MemorandumTutorEntity[];

  //Fields
  @Column('varchar', {
    name: 'proyect',
    comment: 'nombre del Proyecto',
  })
  proyect: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  setProyect() {
    if (!this.proyect) {
      return;
    }
    this.proyect = this.proyect.toUpperCase().trim();
  }
}
