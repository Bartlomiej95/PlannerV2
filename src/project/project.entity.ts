import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProjectI} from "../utils/interfaces/project.interface";
import {TaskItem} from "../task/task.entity";
import {UserItem} from "../user/user.entity";

@Entity()
export class ProjectItem extends BaseEntity implements ProjectI{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column( {length: 150})
    title: string;

    @Column({ length: 100})
    customer: string;

    @Column()
    deadline: Date;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    isFinished: boolean;

    @Column({type: "float", precision: 10, scale: 2})
    projectValue: number;

    @Column()
    scopeOfWork: string;

    @OneToMany(type => TaskItem, entity => entity.project)
    tasks: [string];

    @ManyToMany( type => UserItem, entity => entity.projects)
    users: UserItem[];
}