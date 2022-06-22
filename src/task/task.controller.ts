import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {TaskService} from "./task.service";
import {TaskItem} from "./task.entity";
import {TaskI} from "../utils/interfaces/task.interface";

@Controller('task')
export class TaskController {
    constructor(
        @Inject(TaskService) private taskService: TaskService
    ) {
    }
    @Get('/:taskId')
    async getTask(
        @Param('taskId') taskId: string
    ): Promise<TaskItem> {
        return this.taskService.getOne(taskId)
    }

    @Post('/add')
    async addTask(
        @Body() req: TaskItem
    ): Promise<TaskItem>{
        return this.taskService.addTask(req)
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
