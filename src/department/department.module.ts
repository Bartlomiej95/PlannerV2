import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DepartmentItem, DepartmentSchema} from "./department.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: DepartmentItem.name, schema: DepartmentSchema }])],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
