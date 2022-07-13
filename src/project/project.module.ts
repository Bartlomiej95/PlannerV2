import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ProjectSchema} from "./project.schema";
import {UserModule} from "../user/user.module";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}]), UserModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
