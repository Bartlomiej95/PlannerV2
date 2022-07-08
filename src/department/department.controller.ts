import {Controller, Get, Inject, UseGuards} from '@nestjs/common';
import {DepartmentService} from "./department.service";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../utils/guards/roles.guard";
import {Roles} from "../utils/decorators/roles.decorator";
import { userRole } from 'src/utils/enums/userRole';
import {DepartmentItem} from "./department.entity";

@Controller('department')
export class DepartmentController {
    constructor(
        @Inject(DepartmentService) private departmentService: DepartmentService
    ) {
    }
    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(userRole.ADMIN, userRole.FOUNDER)
    getAllDepartment (): Promise<DepartmentItem[]> {
        return this.departmentService.getAllDepartment();
    }
}
