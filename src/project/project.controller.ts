import {Body, Controller, Delete, Get, Inject, Param, Post, Put, SetMetadata, UseGuards} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {ProjectItem} from "./project.entity";
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from "../utils/guards/roles.guard";
import {userRole} from 'src/utils/enums/userRole';
import {Roles} from 'src/utils/decorators/roles.decorator';

@Controller('project')
export class ProjectController {
    constructor(
        @Inject(ProjectService) private projectService: ProjectService
    ) {
    }

    @Get('/:projectId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.USER, userRole.ADMIN, userRole.FOUNDER)
    getOne(
        @Param('projectId') id: string
    ): Promise<ProjectItem>{
        return this.projectService.getOneProject(id)
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    getAllProjects(): Promise<ProjectItem[]> {
        return this.projectService.getAllProjects()
    }

    @Get('/user/:userId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.USER, userRole.ADMIN, userRole.FOUNDER)
    getProjectsForLoggedUser(
        @Param('userId') userId: string
    ): Promise<ProjectItem[]> {
        return this.projectService.getProjectsForLoggedUser(userId)
    }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    addNewProject(
        @Body() newProject: ProjectItem,
    ): Promise<string>{
        return this.projectService.addNewProject(newProject)
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    updateProject(
        @Body() updatedProjectData: ProjectItem
    ): Promise<string> {
        return this.projectService.updateProject(updatedProjectData)
    }

    @Delete('/:projectId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    removeProject(
        @Param('projectId') id: string
    ): Promise<string>{
        return this.projectService.removeProject(id)
    }

}
