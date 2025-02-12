import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { enviroments } from './enviroments';
import { config } from '@config';
import { AuthModule } from '@auth/modules';
import { CoreModule } from '@core/modules';
import { CommonModule } from '@common/modules';
import { UicModule } from './modules/uic/uic.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
      }),
    }),
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
    HttpModule,
    CommonModule,
    AuthModule,
    CoreModule,
    UicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
