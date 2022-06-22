import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserItem} from "../user/user.entity";
import {ProjectItem} from "../project/project.entity";
import { TaskI } from "src/utils/interfaces/task.interface";

@Entity()
export class TaskItem extends BaseEntity implements TaskI{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 150})
    title: string

    @Column({ type: 'text'})
    brief: string

    @Column({type: 'text'})
    guidelines: string

    @Column({ type: 'int'})
    timeForTheTask: number

    @Column({ type: 'int'})
    categoryTask: string

    @Column( {default: false})
    isFinish: boolean

    @Column({ default: false})
    isActive: boolean

    @Column({ type: 'int', default: 0})
    taskActivationTime: number

    @ManyToOne( type => UserItem, entity => entity.tasksId)
    userId: string

    @ManyToOne(type => ProjectItem, entity => entity.tasksId)
    projectId: string
}