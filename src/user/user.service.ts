import { Injectable } from '@nestjs/common';
import { User } from "./user.entity";

@Injectable()
export class UserService {

    async getOneUser(id: any): Promise<User> {
        return await User.findOneOrFail(id);
    }
}
