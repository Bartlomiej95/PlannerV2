import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {TaskService} from "./task.service";
import {TaskItem} from "./task.entity";
import {TaskI} from "../utils/interfaces/task.interface";
import {ProjectItem} from "../project/project.entity";
import {ProjectService} from "../project/project.service";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../utils/guards/roles.guard";
import { Roles } from 'src/utils/decorators/roles.decorator';
import {userRole} from "../utils/enums/userRole";

@Controller('task')
export class TaskController {
    constructor(
        @Inject(TaskService) private taskService: TaskService,
        @Inject(ProjectService) private projectService: ProjectService
    ) {
    }

    @Get('/:taskId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.USER, userRole.ADMIN, userRole.FOUNDER)
    async getTask(
        @Param('taskId') taskId: string
    ): Promise<TaskItem> {
        return this.taskService.getOne(taskId)
    }

    @Get('/user/:userId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.USER, userRole.ADMIN, userRole.FOUNDER)
    getTasksForLoggedUser(
        @Param('userId') userId: string
    ): Promise<TaskItem[]> {
        return this.taskService.getTasksForLoggedUser(userId)
    }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    async getAllTasks(): Promise<TaskItem[]> {
        return this.taskService.getAllTasks()
    }

    @Post('/add/:projectId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    async addTask(
        @Param('projectId') projectId: string,
        @Body() req: TaskItem
    ): Promise<TaskItem>{
        return this.taskService.addTask(req, projectId)
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.FOUNDER, userRole.ADMIN)
    async updateTask(
        @Body() req: TaskItem
    ): Promise<TaskItem>{
       return this.taskService.updateTask(req)
    }

    @Delete('/:taskId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.FOUNDER, userRole.ADMIN)
    async deleteTask(
        @Param('taskId') taskId: string
    ) {
        return this.taskService.deleteTask(taskId)
    }
}
