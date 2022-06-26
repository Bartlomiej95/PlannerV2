import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import {Response} from "express";
import { v4 as uuid} from 'uuid';
import { sign } from 'jsonwebtoken';
import {UserItem} from "../user/user.entity";
import {hashPwd} from "../utils/hash-pwd";
import {JwtPayload} from "./jwt.strategy";


@Injectable()
export class AuthService {

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
            userWithThisToken = await UserItem.findOne({ where: { currentTokenId: token }});
        } while(!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();

        return token;
    }

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try{
            console.log(req);
            const user = await UserItem.findOne({where: {
                    // email: req.email,
                    password: hashPwd(req.password),
                }});
            console.log(user);
            if(!user){
                return res.json({error: 'Invalid login data'});
            }
            const token = await this.createToken(await this.generateToken(user));

            return res.cookie('jwt', token.accessToken, {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
                .json({ok: true});

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
