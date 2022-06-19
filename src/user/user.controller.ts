import {Controller, Get, Inject, Param} from '@nestjs/common';
import {User} from "./user.entity";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService
    ) {
    }

    @Get('/:userId')
    async getOneUser(
        @Param('userId') userId: string,
    ): Promise<User>{
        return this.userService.getOneUser(userId)
    }
}
