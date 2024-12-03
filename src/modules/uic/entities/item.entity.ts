import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  import { CareerEntity } from '@core/entities';
import { RubricEntity } from './rubric.entity';
  
  @Entity('items', { schema: 'uic' })
  export class ItemEntity {
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
  
   
    @ManyToMany(() =>  RubricEntity, (rubric) => rubric.item)
    @JoinTable({
      name: 'item_rubric',
      joinColumn: { name: 'item_id' },
      inverseJoinColumn: { name: 'rubric_id' },
    })
    rubrics: RubricEntity[];  


    //fk con carerra
    @ManyToOne(() => CareerEntity,(career) => career.item)
    @JoinColumn({ name: 'career_id' })
    career: CareerEntity;

    // Fields
  
    @Column('varchar', {
      name: 'name',
      comment: 'Nombre del item de la rubrica',
    })
    name: string;

    @Column('boolean', {
      name: 'state',
      comment: 'true=activo, false=no activo',
    })
    state: boolean;
  
    @BeforeInsert()
    @BeforeUpdate()
    setName() {
      if (!this.name) {
        return;
      }
      this.name = this.name.toUpperCase().trim();
    }
  }
  