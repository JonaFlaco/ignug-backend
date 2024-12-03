import { Injectable } from '@nestjs/common';
import { CataloguesSeeder } from './catalogues-seeder';
import { UsersSeeder } from './users-seeder';
import { RolesSeeder } from './roles-seeder';
import { MenusSeeder } from './menus-seeder';
import { CareersSeeder } from './careers-seeder';
//import { StudentsSeeder } from './students-seeder';
import { TeachersSeeder } from './teacher-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private cataloguesSeeder: CataloguesSeeder,
    //private studentsSeeder: StudentsSeeder,
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
    private menusSeeder: MenusSeeder,
    private careersSeeder: CareersSeeder,
    private teachersSeeder: TeachersSeeder,
  ) {}

  async run() {
    await this.cataloguesSeeder.run();
    await this.rolesSeeder.run();
    await this.usersSeeder.run();
    await this.menusSeeder.run();
    await this.teachersSeeder.run();
    await this.careersSeeder.run();
    // await this.studentsSeeder.run();
  }
}
