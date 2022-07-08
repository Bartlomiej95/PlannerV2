import { Injectable } from '@nestjs/common';
import {DepartmentItem} from "./department.entity";

@Injectable()
export class DepartmentService {

    async getAllDepartment(): Promise<DepartmentItem[]> {
        try {
            return await DepartmentItem.find();
        } catch (e) {
            throw new Error('Pobranie wszystkich działów nie powiodło się')
        }
    }
}
