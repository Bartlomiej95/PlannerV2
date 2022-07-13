import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TaskItem, TaskSchema} from "./task.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskItem.name, schema: TaskSchema}])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
