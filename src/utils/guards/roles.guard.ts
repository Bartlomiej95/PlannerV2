import {Injectable, CanActivate, ExecutionContext, createParamDecorator} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from "../match-roles";
import {userRole} from "../enums/userRole";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<userRole[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return matchRoles(roles, user.role);
    }
}
