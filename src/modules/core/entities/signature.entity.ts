import { SignatureEntity } from '@uic/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
@Entity('signatures', { schema: 'core' })
export class SignatureCatEntity {
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
  @OneToMany(() => SignatureEntity, (signature) => signature.signature)
  signature: SignatureEntity[];

  //Fields
  @Column('varchar', {
    name: 'name',
    comment: 'nombre del catalogo',
  })
  name: string;

  @Column('varchar', {
    name: 'code',
    unique:true,
    comment: 'codigo',
  })
  code: string;

  @Column('boolean', {
    name: 'state',
    default: true,
    comment: 'true=activo, false=no activo',
  })
  state: boolean;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripcion de la asignatura',
  })
  description: string;


  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }

}
