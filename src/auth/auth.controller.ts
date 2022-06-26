import {Body, Controller, Get, Inject, Post, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../utils/decorators/user-obj.decorator";
import {UserItem} from "../user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService
    ) {
    }

    @Post('/login')
    async userRegister(
        @Body() req: AuthLoginDto,
        @Res() res: Response,
    ): Promise<any>{
        return this.authService.login(req, res);
    }

    @Get('/logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(
        @UserObj() user: UserItem,
        @Res() res: Response,
    ){
        return this.authService.logout(user, res);
    }

}
