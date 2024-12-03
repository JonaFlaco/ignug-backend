import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('rating_weights', { schema: 'uic' })
export class RatingWeightEntity {
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

  @Column('decimal', {
    name: 'weight_one',
    precision: 5,
    scale: 2,
    comment: 'Porcentaje correspondiente',
  })
  weightOne: number;

  @Column('decimal', {
    name: 'weight_two',
    precision: 5,
    scale: 2,
    comment: 'Porcentaje correspondiente',
  })
  weightTwo: number;
}
