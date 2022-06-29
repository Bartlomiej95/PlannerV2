import {Body, Controller, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserItem} from "./user.entity";
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../utils/guards/roles.guard";
import { userRole } from 'src/utils/enums/userRole';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService
    ) {
    }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    getAllUsers(): Promise<UserItem[]>{
        return this.userService.getAllUsers()
    }

    @Get('/:userId')
    @UseGuards(AuthGuard('jwt'))
    getOneUser(
        @Param('userId') userId: string,
    ): Promise<UserItem>{
        return this.userService.getOneUser(userId)
    }

    @Post('/register')
    register(
        @Body() newUser: RegisterDto
    ): Promise<RegisterDto> {
        return this.userService.register(newUser)
    }

}
