import { CatalogueEntity } from '@core/entities';
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

@Entity('institutions', { schema: 'core' })
export class InstitutionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamptz',
  })
  deleteAt: Date;

  /** Relationship **/
  @OneToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'address_id' })
  address: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'acronym',
    type: 'varchar',
    default: 'none',
    comment: 'abreviatura del nombre del instituto',
  })
  acronym: string;

  @Column({
    name: 'cellphone',
    type: 'varchar',
    nullable: true,
    comment: 'teléfono móvil directo de contacto con el instituto',
  })
  cellphone: string;

  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'código único para identificar al instituto',
  })
  code: string;

  @Column({
    name: 'code_sniese',
    type: 'varchar',
    comment: 'code_sniese designado al instituto',
  })
  codeSniese: string;

  @Column({
    name: 'denomination',
    type: 'varchar',
    comment: 'denomination para referirse al instituto',
  })
  denomination: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
    comment: 'email para contactar al instituto',
  })
  email: string;

  @Column({
    name: 'logo',
    type: 'varchar',
    nullable: true,
    comment: 'logo que identifica al instituto',
  })
  logo: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'nombre designado para el instituto',
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
    comment: 'teléfono directo de contacto con el instituto',
  })
  phone: string;

  @Column({
    name: 'short_name',
    type: 'varchar',
    comment: 'nombre corto designado para el instituto',
  })
  shortName: string;

  @Column({
    name: 'slogan',
    type: 'varchar',
    nullable: true,
    comment: 'slogan que describe al instituto',
  })
  slogan: string;

  @Column({
    name: 'web',
    type: 'varchar',
    nullable: true,
    comment: 'web donde localizar al instituto',
  })
  web: string;
}
