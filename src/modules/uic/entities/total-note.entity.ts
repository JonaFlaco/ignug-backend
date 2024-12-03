import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('total_notes', { schema: 'uic' })
export class TotalNoteEntity {
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
    name: 'note_one',
    comment: '',
  })
  noteOne: string;

  @Column('varchar', {
    name: 'note_two',
    comment: '',
  })
  noteTwo: string;

  @Column('varchar', {
    name: 'final_note',
    comment: '',
  })
  finalNote: string;
}
