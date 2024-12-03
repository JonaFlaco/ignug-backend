import { Injectable } from '@nestjs/common';
import {
  CareersService,
  StudentsService,
  TeachersService,
} from '@core/services';
import { CreateStudentDto, CreateTeacherDto } from '@core/dto';
import { CareerEnum } from 'src/modules/auth/enums/career.enum';
import { CareerEntity } from '@core/entities';
import { ReadUserDto } from '@auth/dto';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { UserEnum } from 'src/modules/auth/enums/user.enum';

@Injectable()
export class TeachersSeeder {
  constructor(private teacherService: TeachersService) {}

  async run() {
    await this.createTeachers();
  }

  async createTeachers() {
    const teachers: CreateTeacherDto[] = [];

    teachers.push(
      {
        name: 'LORENA CHULDE',
        user: null,
        career: new CareerEntity(),
      },
      {
        name: 'MAURICIO TAMAYO',
        user: null,
        career: new CareerEntity(),
      },
      {
        name: 'HERNÁN MEJÍA',
        career: new CareerEntity(),
        user: null,
      },
      {
        name: 'YOGLEDIS HERRERA',
        career: new CareerEntity(),
        user: null,
      },
      {
        name: 'FREDDY HEREDIA',
        career: new CareerEntity(),
        user: null,
      },
      {
        name: 'LUIS CHIPUXI',
        career: new CareerEntity(),
        user: null,
      },
    );
    for (const teacher of teachers) {
      await this.teacherService.create(teacher);
    }
  }
}
