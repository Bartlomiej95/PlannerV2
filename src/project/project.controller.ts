import {Body, Controller, Get, Inject, Post, UseGuards} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../utils/guards/roles.guard";
import {userRole} from "../utils/enums/userRole";
import {ProjectItem} from "./project.schema";
import { Roles } from 'src/utils/decorators/roles.decorator';
import {users} from "../../../frontend/src/store/Users/reducer";

@Controller('project')
export class ProjectController {
    constructor(
        @Inject(ProjectService) private projectService: ProjectService
    ) {
    }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    getAllProjects(): Promise<ProjectItem[]>{
        return this.projectService.getAllProjects();
    }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    addNewProject(
        @Body() newProject: ProjectItem,
    ): Promise<string> {
        return this.projectService.addNewProject(newProject)
    }
}
