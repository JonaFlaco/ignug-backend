import { ModalityEntity } from '@uic/entities';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  @Entity('download_formats', { schema: 'uic' })
  export class DownloadFormatEntity {
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
        nullable:true,
        comment: 'Descarga de archivos ejemplo:plantillas de los documentos  ',
      })
      file: string;

      

}