import { Injectable } from '@nestjs/common';
import {TaskItem} from "./task.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class TaskService {

    constructor(@InjectModel(TaskItem.name) private taskModel: Model<TaskItem>) {
    }

    async getOne(id: string): Promise<TaskItem> {
        return await this.taskModel.findById(id).exec();
    }

    async addTask(req: TaskItem, projectId: string): Promise<TaskItem> {

        try{
            const newTask = await this.taskModel.create({
                id: req.id,
                categoryTask: req.categoryTask,
                title: req.title,
                timeForTheTask: req.timeForTheTask,
                brief: req.brief,
                guidelines: req.guidelines,
                isFinish: false,
                isActive: false,
                taskActivationTime: 0,
                project: projectId,
            });

            await newTask.save();

            return newTask;

        } catch (e) {
            throw new Error('Dodawanie nowego użytkownika nie powiodło się ');
        }
    }

    async updateTask(req: TaskItem): Promise<TaskItem> {

            try {
            const updatedTask = await this.taskModel.findOneAndUpdate({ id: req.id}, {
                title: req.title,
                categoryTask: req.categoryTask,
                timeForTheTask: req.timeForTheTask,
                brief: req.brief,
                guidelines: req.guidelines,
                user: req.id,
            });

            await updatedTask.save();

            return updatedTask;

        } catch (e){
            throw new Error('Aktualizacja zadania nie powiodła się')
        }

    }

    async deleteTask(taskId: string): Promise<string> {

        try {
            const task = await this.taskModel.findOneAndRemove({ where: { id: taskId}})

            return task.title

        } catch (e){
            throw new Error('Nie udało się usunąć zadania')
        }
    }

    async getTasksForLoggedUser(userId: string): Promise<TaskItem[] | null> {
        try {
            const tasks = await this.taskModel.find({ where: {user: userId }});
            return tasks;

        } catch (e){
            throw new Error('Oh noes Anbeliwybul')
        }
    }

    async getAllTasks(): Promise<TaskItem[]> {
        try{
            const tasks = await this.taskModel.find();
            return tasks;
        } catch (e){
            throw new Error('Nie udało się pobrać zadań ')
        }
    }
}
