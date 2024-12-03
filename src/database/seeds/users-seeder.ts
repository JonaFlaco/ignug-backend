import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { RolesService, UsersService } from '@auth/services';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class UsersSeeder {
  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  async run() {
    await this.createUsers();
  }

  async createUsers() {
    const users: CreateUserDto[] = [];
    const roles = (await this.rolesService.findAll()).data as RoleEntity[];
    const adminRole = roles.find((role) => role.code === RoleEnum.ADMIN);
    const teacherRole = roles.find((role) => role.code === RoleEnum.TEACHER);
    const coordinatorAdministrativeRole = roles.find(
      (role) => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE,
    );
    const coordinatorCareerRole = roles.find(
      (role) => role.code === RoleEnum.COORDINATOR_CAREER,
    );
    const rectorRole = roles.find((role) => role.code === RoleEnum.RECTOR);

    const studentRole = roles.find((role) => role.code === RoleEnum.STUDENT);

    users.push(
      {
        email: 'admin@gmail.com',
        lastname: 'Perez',
        name: 'Admin',
        password: '12345678',
        passwordChanged: false,
        roles: [adminRole],
        username: 'admin',
        identification: '1234567891',
      },
      {
        email: 'coordinator_administrative@gmail.com',
        lastname: 'Perez',
        name: 'Coordinator Administrative',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorAdministrativeRole],
        username: 'coordinator_administrative',
        identification: '1334567891',
      },
      {
        email: 'lchulde@yavirac.edu.ec',
        lastname: 'CHULDE OBANDO',
        name: 'LORENA ELIZABETH',
        password: '12345678',
        passwordChanged: false,
        roles: [teacherRole],
        username: 'Lorena',
        identification: '1244567891',
      },
      {
        email: 'coordinator_career@gmail.com',
        lastname: 'Perez',
        name: 'Coordinator Career',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorCareerRole],
        username: 'coordinator_career',
        identification: '1235567891',
      },
      {
        email: 'rector@gmail.com',
        lastname: 'Perez',
        name: 'Rector',
        password: '12345678',
        passwordChanged: false,
        roles: [rectorRole],
        username: 'rector',
        identification: '1234667891',
      },
      {
        email: 'rsa.haro@yavirac.com',
        lastname: 'Haro Argudo',
        name: 'Ronnald Santiago',
        password: '1726236324',
        passwordChanged: false,
        roles: [studentRole],
        username: 'Rsha',
        identification: '1726236324',
      },
      {
        email: 'ljl.monta@yavirac.edu.ec',
        lastname: 'Monta Llashag',
        name: 'Ligia Joselin',
        password: '12345678',
        passwordChanged: false,
        roles: [studentRole],
        username: 'Ljml',
        identification: '1234577891',
      },
      {
        email: 'roq.bol@yavirac.edu.ec',
        lastname: 'Bol Quiñonez ',
        name: 'Ruby Oforiwa',
        password: '12345678',
        passwordChanged: false,
        roles: [studentRole],
        username: 'Robq',
        identification: '1234568891',
      },
      {
        email: 'jaa.villacis@yavirac.edu.ec',
        lastname: 'Villacis Aroca',
        name: 'Jonas Aaron',
        password: '12345678',
        passwordChanged: false,
        roles: [studentRole],
        username: 'Java',
        identification: '1234567991',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
