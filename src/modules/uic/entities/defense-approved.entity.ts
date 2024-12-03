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
  import { RubricEntity } from './rubric.entity';
  import { StudentEntity, TeacherEntity } from '@core/entities';
import { NoteDefenseEntity } from './note-defense.entity';
  
  @Entity('defense-approveds', { schema: 'uic' })
  export class  DefenseApprovedEntity {
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
  
    @OneToOne(() => StudentEntity, (student) => student.approved)
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;
  
    @OneToOne(() => NoteDefenseEntity, (rating) => rating.approved)
    @JoinColumn({ name: 'rating_id' })
    rating: NoteDefenseEntity;

  }
  