import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {ProjectItem} from "./project.entity";
import { AuthGuard } from '@nestjs/passport';
import {UserObj} from "../utils/decorators/user-obj.decorator";
import {UserItem} from "../user/user.entity";

@Controller('project')
export class ProjectController {
    constructor(
        @Inject(ProjectService) private projectService: ProjectService
    ) {
    }

    @Get('/:projectId')
    getOne(
        @Param('projectId') id: string
    ): Promise<ProjectItem>{
        return this.projectService.getOneProject(id)
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    addNewProject(
        @Body() newProject: ProjectItem,
    ): Promise<string>{
        return this.projectService.addNewProject(newProject)
    }

    @Put('/')
    updateProject(
        @Body() updatedProjectData: ProjectItem
    ): Promise<string> {
        return this.projectService.updateProject(updatedProjectData)
    }

    @Delete('/:projectId')
    removeProject(
        @Param('projectId') id: string
    ): Promise<string>{
        return this.projectService.removeProject(id)
    }
}
