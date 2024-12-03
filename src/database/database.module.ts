import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { CataloguesSeeder } from './seeds/catalogues-seeder';
import { UsersSeeder } from './seeds/users-seeder';
import { RolesSeeder } from './seeds/roles-seeder';
import { MenusSeeder } from './seeds/menus-seeder';
import { CareersSeeder } from './seeds/careers-seeder';
//import { StudentsSeeder } from './seeds/students-seeder';
import { TeachersSeeder } from './seeds/teacher-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    //StudentsSeeder,
    CareersSeeder,
    CataloguesSeeder,
    UsersSeeder,
    RolesSeeder,
    MenusSeeder,
    TeachersSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
