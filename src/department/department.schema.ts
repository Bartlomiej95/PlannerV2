import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class DepartmentItem extends Document {
    @Prop()
    name: string

    @Prop({ default: false})
    isActive: boolean
}
export const DepartmentSchema = SchemaFactory.createForClass(DepartmentItem);