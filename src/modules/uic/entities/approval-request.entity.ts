import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('approval-requests', { schema: 'uic' })
  export class ApprovalRequestEntity {
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
    //Fields

    @Column('varchar', {
      name: 'name',
      comment: 'nombre',
    })
    name: string;

    @Column('numeric', {
      name: 'cide',
      comment: '',
    })
    cide: number;

    @Column('varchar', {
      name: 'teacher',
      comment: 'nombre',
    })
    teacher: string;

    @Column('varchar', {
      name: 'career',
      comment: 'nombre',
    })
    career: string;

    @Column('varchar', {
      name: 'period',
      comment: 'nombre',
    })
    period: string;

    @Column('timestamp', {
      name: 'date',
      comment: 'nombre',
    })
    date: Date;

    @Column('numeric', {
      name: 'cell',
      comment: 'nombre',
    })
    cell: number;

    @Column('varchar', {
      name: 'email',
      comment: 'nombre',
    })
    email: string;
  
   
  }