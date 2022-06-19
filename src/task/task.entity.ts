import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {type} from "os";

@Entity()
export class TaskItem extends BaseEntity{
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

    @Column()
    isFinish: boolean

    @Column()
    isActive: boolean

    @Column({ type: 'int'})
    taskActivationTime: number

}