import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import {ProjectItem} from "./project.schema";
import {UserItem} from "../user/user.schema";

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('Project') private projectModel: Model<ProjectItem>,
        @InjectModel(UserItem.name) private userModel: Model<UserItem>
    ) {
    }

    async getAllProjects(): Promise<ProjectItem[]> {
        return this.projectModel.find();
    }

    async addNewProject(newProject): Promise<string> {
        const { title, customer, deadline, duration, projectValue, description } = newProject.projectData;

        try{
            const project = await this.projectModel.create({
                title,
                customer,
                deadline,
                duration,
                projectValue,
                description,
                users: [...newProject.usersId]
            });

            await project.save();

            const usersId = [...newProject.usersId];

            //We need updated every users which is selected to added project - added to user.projects new id project
            for(let i = 0; i < usersId.length; i++){
                const user = await this.userModel.findOne({_id: newProject.usersId[i]});
                user.projects.push(project._id);
                await user.save();
            }

        } catch (e) {
            throw new Error('Dodawanie nowego projektu nie powiodło się')
        }




        return title;
    }
}
