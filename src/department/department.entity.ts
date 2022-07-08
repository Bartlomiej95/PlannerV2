import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserItem} from "../user/user.entity";

@Entity()
export class DepartmentItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(type => UserItem, entity => entity.department)
    users: UserItem[]
}