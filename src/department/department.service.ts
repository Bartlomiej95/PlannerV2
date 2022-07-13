import { Injectable } from '@nestjs/common';
import {DepartmentItem} from "./department.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class DepartmentService {

    constructor(@InjectModel(DepartmentItem.name) private departmentModel: Model<DepartmentItem>) {
    }

    async getAllDepartment(): Promise<DepartmentItem[]> {
        try {
            return await this.departmentModel.find();
        } catch (e) {
            throw new Error('Pobranie wszystkich działów nie powiodło się')
        }
    }
}
