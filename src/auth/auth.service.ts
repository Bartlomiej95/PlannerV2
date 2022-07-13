import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import {Response} from "express";
import { v4 as uuid} from 'uuid';
import { sign } from 'jsonwebtoken';
import {UserItem} from "../user/user.schema";
import {hashPwd} from "../utils/hash-pwd";
import {JwtPayload} from "./jwt.strategy";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";


@Injectable()
export class AuthService {

    constructor(@InjectModel(UserItem.name) private userModel: Model<UserItem>)
     {
    }

    private createToken(currentTokenId: string): {accessToken: string, expiresIn: number } {
        const payload: JwtPayload = { id: currentTokenId }
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn });
        return {
            accessToken,
            expiresIn,
        }
    }

    private async generateToken(user: UserItem): Promise<string>{
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await this.userModel.findOne({ currentTokenId: token });
        } while(!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();

        return token;
    }

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try{
            const user = await this.userModel.findOne({where: {
                    email: req.email,
                    password: hashPwd(req.password),
                }});

            if(!user){
                return res.json({error: 'Invalid login data'});
            }

            const token = await this.createToken(await this.generateToken(user));

            return res.cookie('jwt', token.accessToken, {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
                .json({ok: true, user});

        }catch (e){
            return res.json({ error: e.message});
        }
    }

    async logout(user: UserItem, res: Response) {
        console.log(user);
        try{
            user.currentTokenId = null;
            await user.save();
            res.clearCookie(
                'jwt',
                {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                }
            );
            return res.json({ok: true});

        }catch (e){
            return res.json({error: e.message});
        }
    }
}
