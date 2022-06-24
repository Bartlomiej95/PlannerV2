import { Injectable } from '@nestjs/common';
import {TaskItem} from "./task.entity";

@Injectable()
export class TaskService {

    async getOne(id: string): Promise<TaskItem> {
        return await TaskItem.findOneOrFail({ where: { id} });
    }

    async addTask(req: TaskItem, projectId: string): Promise<TaskItem> {

        try{
            const newTask = new TaskItem();
            newTask.id = req.id;
            newTask.categoryTask = req.categoryTask;
            newTask.title = req.title;
            newTask.timeForTheTask = req.timeForTheTask;
            newTask.brief = req.brief;
            newTask.guidelines = req.guidelines;
            newTask.isFinish = false;
            newTask.isActive = false;
            newTask.taskActivationTime = 0;
            newTask.projectId = projectId;

            await newTask.save();

            return newTask;

        } catch (e) {
            throw new Error('Dodawanie nowego użytkownika nie powiodło się ');
        }
    }

    async updateTask(req: TaskItem): Promise<TaskItem> {
        const task = await TaskItem.findOneOrFail( { where: { id: req.id }})

        if(!task) {
            throw new Error('Nie ma takiego zadania')
        }

        try {
            task.title = req.title
            task.categoryTask = req.categoryTask
            task.timeForTheTask = req.timeForTheTask
            task.brief = req.brief
            task.guidelines = req.guidelines
            task.userId = req.userId

            await task.save();

            return task;

        } catch (e){
            throw new Error('Aktualizacja zadania nie powiodła się')
        }

    }

    async deleteTask(taskId: string): Promise<string> {
        const task = await TaskItem.findOneOrFail({ where: { id: taskId}})

        if(!task){
            throw new Error('Nie ma takiego zadania')
        }

        try {
            await task.remove()
            return task.title

        } catch (e){
            throw new Error('Nie udało się usunąć zadania')
        }
    }

}
