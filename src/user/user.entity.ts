import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {userRole} from "../utils/enums/userRole";
import {TaskItem} from "../task/task.entity";
import {ProjectItem} from "../project/project.entity";
import {DepartmentItem} from "../department/department.entity";

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

    @Column({length: 200})
    password: string

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null

    @Column()
    position: string

    @Column({default: userRole.TEST_USER})
    role: userRole

    @OneToMany( type => TaskItem, entity => entity.user)
    tasks: [string]

    @ManyToMany( type => ProjectItem, entity => entity.users)
    @JoinTable()
    projects: ProjectItem[]

    @ManyToOne(type => DepartmentItem, entity => entity.users)
    department: string
}