import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { CatalogueEntity } from './catalogue.entity';
@Entity('catalogue-types', { schema: 'uic' })
export class CatalogueTypeEntity {
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
  @OneToMany(() => CatalogueEntity, (catalogue) => catalogue.catalogueType)
  catalogue: CatalogueEntity[];

  //Fields

  @Column('varchar', {
    name: 'name',
    // unique:true,
    comment: 'nombre del catalogo',
  })
  name: string;

  @Column('varchar', {
    name: 'code',
    unique:true,
    comment: 'codigo',
  })
  code: string;

  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }

}
