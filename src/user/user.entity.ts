import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {userRole} from "../utils/enums/userRole";

@Entity()
export class UserItem extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 100})
    email: string

    @Column({length: 50})
    name: string

    @Column({length: 50})
    surname: string

    @Column({length: 100})
    password: string

    @Column()
    position: string

    @Column({default: userRole.TEST_USER})
    role: userRole
}