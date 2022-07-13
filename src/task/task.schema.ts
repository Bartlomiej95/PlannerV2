import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { uuid } from "uuidv4";
import {Document} from "mongoose";

@Schema()
export class TaskItem extends Document{
    @Prop({ required: true, type: uuid })
    id: string;

    @Prop({ required: true})
    title: string;

    @Prop({ required: true})
    brief: string;

    @Prop()
    guidelines: string;

    @Prop( { required: true })
    timeForTheTask: number;

    @Prop()
    categoryTask: string;

    @Prop( {default: false})
    isFinish: boolean;

    @Prop({ default: false})
    isActive: boolean;

    @Prop({ default: 0 })
    taskActivationTime: number;

    @Prop()
    user: string;

    @Prop()
    project: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskItem)