import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserItem} from "./user.schema";
import {RegisterDto} from "./dto/register.dto";
import {hashPwd} from "../utils/hash-pwd";


@Injectable()
export class UserService {

    constructor(
        @InjectModel(UserItem.name) private userModel: Model<UserItem>) {}

    async getOneUser(id): Promise<UserItem> {
        return await this.userModel.findById({id}).exec();
    }

    async register(newUser: RegisterDto): Promise<RegisterDto> {

        const { email, name, surname, password } = newUser;

        try {
            const searchedUser = await this.userModel.findOne({ email: newUser.email})

            if(searchedUser){
               throw new Error('Użytkownik o takim emailu juz istnieje')
            }

            const registerUser = await this.userModel.create({
                email,
                password: hashPwd(password),
                name,
                surname,
            });

            await registerUser.save();

            return registerUser;

        } catch (e){
            throw new Error('Rejestracja nie powiodła się ')
        }
    }

    async getAllUsers(): Promise<UserItem[]> {
        try {
            return await this.userModel.find();
        } catch (e) {
            throw new Error('Pobranie użytkowników nie powiodło się')
        }
    }

    async getAllUsersForProject(projectId): Promise<UserItem[] | []>{
        try{
            return await this.userModel.find({projects: {projectId}});
        }catch(e){
            throw new Error('Pobranie użytkowników nie powiodło się')
        }
    }
}
