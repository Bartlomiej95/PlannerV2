import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {Response} from "express";

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
}
