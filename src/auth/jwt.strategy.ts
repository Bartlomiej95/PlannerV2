import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserItem } from "../user/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";


export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(UserItem.name) private userModel: Model<UserItem>
    ) {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload, done: (error, user) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false);
        }

        const user = await this.userModel.findOne( {where: { currentTokenId: payload.id }});
        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        done(null, user);
    }
}