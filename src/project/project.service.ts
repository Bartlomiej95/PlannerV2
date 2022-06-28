import { Injectable } from '@nestjs/common';
import {ProjectItem} from "./project.entity";
import {UserItem} from "../user/user.entity";
import {createQueryBuilder, getConnection, In} from "typeorm";

@Injectable()
export class ProjectService {

    async getOneProject(id: string): Promise<ProjectItem> {
        try {
            return await ProjectItem.findOneOrFail({ where: { id }})
        } catch (e){
            throw new Error('Nie znaleziono zadania o podanym id')
        }
    }

    async addNewProject(newItem: ProjectItem): Promise<string> {
        const newProject = new ProjectItem();
        try {
            newProject.title = newItem.title;
            newProject.customer = newItem.customer;
            newProject.deadline = newItem.deadline;
            newProject.description = newItem.description;
            newProject.duration = newItem.duration;
            newProject.projectValue = newItem.projectValue;
            newProject.scopeOfWork = newItem.scopeOfWork;

            await newProject.save();

            return newProject.id;

        } catch (e){
            throw new Error('Dodawanie nowego projektu nie powiodło się')
        }
    }

    async updateProject(updatedProjectData: ProjectItem): Promise<string> {
        try{
            const updatedProjected = await ProjectItem.findOneOrFail({where:{id: updatedProjectData.id}});
            updatedProjected.title = updatedProjectData.title;
            updatedProjected.customer = updatedProjectData.customer;
            updatedProjected.deadline = updatedProjectData.deadline;
            updatedProjected.description = updatedProjectData.description;
            updatedProjected.duration = updatedProjectData.duration;
            updatedProjected.projectValue = updatedProjectData.projectValue;
            updatedProjected.scopeOfWork = updatedProjectData.scopeOfWork;

            await updatedProjected.save()

            return updatedProjected.title;

        }catch (e) {
            throw new Error('Aktualizacja projektu nie powiodła się.');
        }
    }

    async removeProject(id: string): Promise<string> {
        try {
            const removingProject = await ProjectItem.findOneOrFail({where: {id}})

            await removingProject.remove();

            return removingProject.title;

        } catch (e){
            throw new Error(`Usuwanie projektu nie powiodło się`)
        }
        throw new Error('Method not implemented.');
    }

    async getProjectsForLoggedUser(userId: string): Promise<ProjectItem[]> {
        try {
            const projects = await createQueryBuilder('project')
                .leftJoinAndSelect('project.users', 'users')
                .where('users.id = :id', {id: userId})
                .getMany() as ProjectItem[]
            console.log(projects);
            return projects;

        } catch (e) {
            throw new Error('Pobranie projektów nie powiodło się ')
        }
    }

    async getAllProjects(): Promise<ProjectItem[]>{
        try {
            const projects = await ProjectItem.find();
            return projects;
        } catch (e) {
            throw new Error('Pobranie projektów nie powiodło się.')
        }
    }
}
