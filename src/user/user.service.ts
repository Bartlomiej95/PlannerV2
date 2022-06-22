import { Injectable } from '@nestjs/common';
import { UserItem } from "./user.entity";

@Injectable()
export class UserService {

    async getOneUser(id): Promise<UserItem> {
        return await UserItem.findOneOrFail(id)
    }
}
