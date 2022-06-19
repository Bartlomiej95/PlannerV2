import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import {TaskItem} from "./task/task.entity";
import {User} from "./user/user.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": 'mysql',
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.DB_PORT),
    "username": process.env.DB_USERNAME,
    "database": process.env.DB_DATABASE,
    "password": process.env.DB_PASSWORD,
    "entities": [TaskItem, User],
    "bigNumberStrings": false,
    "logging": true,
    "synchronize": true,
  }), UserModule, TaskModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
