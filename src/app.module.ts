import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import {TaskItem} from "./task/task.entity";
import { UserItem} from "./user/user.entity";
import { ProjectModule } from './project/project.module';
import {ProjectItem} from "./project/project.entity";
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import {DepartmentItem} from "./department/department.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": 'mysql',
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.DB_PORT),
    "username": process.env.DB_USERNAME,
    "database": process.env.DB_DATABASE,
    "password": process.env.DB_PASSWORD,
    "entities": [TaskItem, UserItem, ProjectItem, DepartmentItem],
    "bigNumberStrings": false,
    "logging": true,
    "synchronize": true,
  }), UserModule, TaskModule, ProjectModule, AuthModule, DepartmentModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
