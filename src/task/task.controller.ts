import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {TaskService} from "./task.service";
import {TaskItem} from "./task.entity";
import {TaskI} from "../utils/interfaces/task.interface";
import {ProjectItem} from "../project/project.entity";
import {ProjectService} from "../project/project.service";

@Controller('task')
export class TaskController {
    constructor(
        @Inject(TaskService) private taskService: TaskService,
        @Inject(ProjectService) private projectService: ProjectService
    ) {
    }
    @Get('/:taskId')
    async getTask(
        @Param('taskId') taskId: string
    ): Promise<TaskItem> {
        return this.taskService.getOne(taskId)
    }

    @Post('/add/:projectId')
    async addTask(
        @Param('projectId') projectId: string,
        @Body() req: TaskItem
    ): Promise<TaskItem>{
        return this.taskService.addTask(req, projectId)
    }

    @Put('/')
    async updateTask(
        @Body() req: TaskItem
    ): Promise<TaskItem>{
       return this.taskService.updateTask(req)
    }

    @Delete('/:taskId')
    async deleteTask(
        @Param('taksId') taskId: string
    ) {
        return this.taskService.deleteTask(taskId)
    }
}
