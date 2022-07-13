import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserItem, UserSchema} from "./user.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: UserItem.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
