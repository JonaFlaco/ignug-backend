// import { Injectable } from '@nestjs/common';
// import { CareersService, StudentsService } from '@core/services';
// import { CreateStudentDto } from '@core/dto';
// import { CareerEnum } from 'src/modules/auth/enums/career.enum';
// import { CareerEntity } from '@core/entities';
// import { ReadUserDto } from '@auth/dto';
// import { UsersService } from '@auth/services';
// import { UserEntity } from '@auth/entities';
// import { UserEnum } from 'src/modules/auth/enums/user.enum';

// @Injectable()
// export class StudentsSeeder {
//   constructor(
//     private studentService: StudentsService,
//     private careerService: CareersService,
//     private usersService: UsersService,
//   ) {}

//   async run() {
//     await this.createStudents();
//   }

//   async createStudents() {
//     const students: CreateStudentDto[] = [];
//     const career = (await this.careerService.findAll()).data as CareerEntity[];
//     const user = (await this.usersService.findAll()).data as UserEntity[];
//     const dsf = career.find(
//       (career) => career.name === CareerEnum.DESARROLLO_DE_SOFTWARE,
//     );
//     const student = user.find((user) => user.name === UserEnum.Ronnald_Haro);

//     students.push(
//       {
//         name: 'HARO ARGUDO RONNALD SANTIAGO',
//         career: [dsf],
//         user: [student],
//         identification_card: 1726236324,
//       },
//       {
//         name: 'MINA VILLALBA SAYMON ARIEL',
//         //user: new ReadUserDto(),
//         career: dsf,
//         user: [student],
//         identification_card: 1234567891,
//       },
//       {
//         name: 'ORTEGA GAMBOA DIDYER ALEXANDER',
//         //user: new ReadUserDto(),
//         career: [dsf],
//         user: [student],
//         identification_card: 1234567891,
//       },
//       {
//         name: 'BOL QUIÑONEZ RUBY OFORIWA',
//         //user: new ReadUserDto(),
//         career: [dsf],
//         user: [student],
//         identification_card: 1234567891,
//       },
//       {
//         name: 'CAIZA YANEZ JONATHAN ISAAC',
//         //user: new ReadUserDto(),
//         career: [dsf],
//         user: [student],
//         identification_card: 1234567891,
//       },
//       {
//         name: 'MONTA LLASHAG LIGIA JOSELIN',
//         //user: new ReadUserDto(),
//         career: [dsf],
//         user: [student],
//         identification_card: 1234567891,
//       },
//     );
//     for (const student of students) {
//       await this.studentService.create(student);
//     }
//   }
// }
