import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {UserItem} from "./user.entity";
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService
    ) {
    }

    @Get('/:userId')
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
