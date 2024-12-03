import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('format-proyect-plans', { schema: 'uic' })
  export class FormatProyectPlanEntity {
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
    /////////
    @Column('varchar', {
      name: 'name',
      comment: 'Inicio del evento',
    })
    name: string;

    @Column('varchar', {
      name: 'career',
      comment: 'Inicio del evento',
    })
    career: string;

    @Column('timestamp', {
      name: 'date',
      comment: 'Fin del evento',
    })
    date: Date;
  
    @Column('varchar', {
      name: 'research',
      comment: 'Inicio del evento',
    })
    research: string;
  
    @Column('varchar', {
      name: 'theme',
      comment: 'Orden de las fases',
    })
    theme: string;

    @Column('varchar', {
      name: 'problem',
      comment: 'Orden de las fases',
    })
    problem: string;

    @Column('varchar', {
      name: 'justification',
      comment: 'Orden de las fases',
    })
    justification: string;

    @Column('varchar', {
      name: 'objective',
      comment: 'Orden de las fases',
    })
    objective: string;

    @Column('varchar', {
      name: 'objespecific',
      comment: 'Orden de las fases',
    })
    objespecific: string;

    @Column('varchar', {
      name: 'scopeeme',
      comment: 'Orden de las fases',
    })
    scopeeme: string;

    @Column('varchar', {
      name: 'theorical',
      comment: 'Orden de las fases',
    })
    theorical: string;

    @Column('varchar', {
      name: 'methodological',
      comment: 'Orden de las fases',
    })
    methodological: string;

    @Column('varchar', {
      name: 'methodology',
      comment: 'Orden de las fases',
    })
    methodology: string;

    @Column('varchar', {
      name: 'bibliography',
      comment: 'Orden de las fases',
    })
    bibliography: string;


    @Column('varchar', {
      name: 'budget',
      comment: 'Orden de las fases',
    })
    budget: string;

  }