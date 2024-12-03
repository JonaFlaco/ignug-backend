import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('formats', { schema: 'uic' })
  export class FormatEntity {
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
      comment: 'nombre del archivo de las plantillas de los documentos  ',
    })
    name: string;

    @Column('varchar', {
      name: 'file',
      comment: 'Descarga de archivos ejemplo:plantillas de los documentos  ',
    })
    file: string;

      @Column('boolean', {
        name: 'state',
        comment: 'El estado del archivo (Si es requerido :true / si es false : no requerido) ',
      })
      state: boolean;

      @Column('varchar', {
        name: 'description',
        comment: 'descripcion de los formatos',
      })
      description: string;
}