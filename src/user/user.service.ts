import { Injectable } from '@nestjs/common';
import { UserItem } from "./user.entity";
import {RegisterDto} from "./dto/register.dto";
import {hashPwd} from "../utils/hash-pwd";

@Injectable()
export class UserService {

    async getOneUser(id): Promise<UserItem> {
        return await UserItem.findOneOrFail(id)
    }

    async register(newUser: RegisterDto): Promise<RegisterDto> {
        try {
            const searchedUser = await UserItem.findOne({where: { email: newUser.email}})

            if(searchedUser){
               throw new Error('Użytkownik o takim emailu juz istnieje')
            }

            const registerUser = await new UserItem();

            registerUser.email = newUser.email;
            registerUser.password = hashPwd(newUser.password);
            registerUser.name = newUser.name;
            registerUser.surname = newUser.surname;

            await registerUser.save();

            return registerUser;

        } catch (e){
            throw new Error('Rejestracja nie powiodła się ')
        }
    }

    async getAllUsers(): Promise<UserItem[]> {
        try {
            return await UserItem.find();
        } catch (e) {
            throw new Error('Pobranie użytkowników nie powiodło się')
        }
    }
}
