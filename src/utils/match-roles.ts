import {userRole} from "./enums/userRole";

export const matchRoles = (roles: userRole[], userRole: userRole) => {
    console.log(roles);
    console.log(userRole);
    return roles.includes(userRole);
}