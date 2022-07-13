import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { ProjectModule } from './project/project.module';


@Module({
  imports: [MongooseModule.forRoot(
      `${process.env["MONGOOSEDB"]}`
  ),UserModule, TaskModule, DepartmentModule, AuthModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
