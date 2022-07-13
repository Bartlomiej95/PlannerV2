import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtStrategy} from "./jwt.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {UserItem, UserSchema} from "../user/user.schema";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
  imports: [MongooseModule.forFeature([{ name: UserItem.name, schema: UserSchema}])]
})
export class AuthModule {}
