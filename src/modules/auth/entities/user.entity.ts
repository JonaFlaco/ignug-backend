import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
} from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { RoleEntity } from '@auth/entities';
import { CatalogueEntity, StudentEntity, TeacherEntity } from '@core/entities';

@Entity('users', { schema: 'auth' })
export class UserEntity {
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

  /** Inverse Relationship **/
  @ManyToMany(() => RoleEntity, (role) => role.users)
  roles: RoleEntity[];

  @OneToOne(() => StudentEntity, (student) => student.user)
  student: StudentEntity;

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher: TeacherEntity;

  /** Relationship **/
  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'blood_type_id' })
  bloodType: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'ethnic_origin_id' })
  ethnicOrigin: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'gender_id' })
  gender: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'identification_type_id' })
  identificationType: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'marital_status_id' })
  maritalStatus: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'sex_id' })
  sex: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'activated_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de ultimo login',
  })
  activatedAt: Date;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    comment: 'Correo Electronico',
  })
  email: string;

  @Column({
    name: 'birthdate',
    type: 'date',
    nullable: true,
    comment: 'Fecha de nacimiento',
  })
  birthdate: Date;

  @Column({
    name: 'email_verified_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Verificacion de correo',
  })
  emailVerifiedAt: Date;

  @Column({
    name: 'identification',
    type: 'varchar',
    unique: true,
    nullable: true,
    comment: 'Numero de documento puede ser la cedula',
  })
  identification: string;

  @Column({
    name: 'lastname',
    type: 'varchar',
    comment: 'Apellidos',
  })
  lastname: string;

  @Exclude()
  @Column({
    name: 'password',
    type: 'varchar',
    comment: 'Contraseña',
  })
  password: string;

  @Column({
    name: 'password_changed',
    type: 'boolean',
    default: false,
    comment: 'true: ya cambió la contraseña y False:no',
  })
  passwordChanged: boolean;

  @Column({
    name: 'personal_email',
    type: 'varchar',
    nullable: true,
    comment: 'Correo Electronico Personal',
  })
  personalEmail: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
    comment: 'Teléfono',
  })
  phone: string;

  @Exclude()
  @Column({
    name: 'max_attempts',
    type: 'int',
    default: 3,
    comment:
      'Intentos máximos para errar la contraseña, si llega a cero el usuario se bloquea',
  })
  maxAttempts: number;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombres del usuario',
  })
  name: string;

  @Column({
    name: 'suspended_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de la ultima suspension del usuario',
  })
  suspendedAt: Date;

  @Column({
    name: 'username',
    type: 'varchar',
    comment: 'Nombre de usuario para ingreso al sistema',
  })
  username: string;

  /** Before Actions **/
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await Bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async checkBirthdate() {
    if (!this.birthdate) {
      return;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setEmail() {
    if (!this.email) {
      return;
    }
    this.email = this.email.toLowerCase().trim();
  }
}
