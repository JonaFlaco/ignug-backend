import {
  CatalogueEntity,
  EstudianteEntity,
  ModalityEntity,
  PlanningEntity,
  ProjectEntity,
  ProjectPlanEntity,
  StudentInformationEntity,
  TeacherEntity,
  UploadProjectEntity,
} from '@uic/entities';
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

@Entity('tutor_assignments', { schema: 'uic' })
export class TutorAssignmentEntity {
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

  @ManyToOne(
    () => StudentInformationEntity,
    (student) => student.tutorAssignments,
  )
  @JoinColumn({ name: 'student_id' })
  student: StudentInformationEntity;

  @ManyToOne(
    () => UploadProjectEntity,
    (uploadProject) => uploadProject.tutorAssignments,
  )
  @JoinColumn({ name: 'uploadProject_id' })
  uploadProject: UploadProjectEntity;

  @ManyToOne(() => CatalogueEntity, (type) => type.tutorAssignments)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @ManyToOne(() => ModalityEntity, (name) => name.tutorAssignments)
  @JoinColumn({ name: 'name_id' })
  name: ModalityEntity;

  @ManyToOne(
    () => EstudianteEntity,
    (estudiante) => estudiante.tutorAssignments,
  )
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: EstudianteEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.tutorAssignments)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;
}
