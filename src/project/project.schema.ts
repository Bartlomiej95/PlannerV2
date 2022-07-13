import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class ProjectItem extends Document {
    @Prop()
    title: string;

    @Prop()
    customer: string;

    @Prop()
    deadline: Date;

    @Prop()
    duration: number;

    @Prop()
    projectValue: number;

    @Prop()
    description: string;

    @Prop()
    users: [string];

    @Prop()
    tasks: [string];

}

export const ProjectSchema = SchemaFactory.createForClass(ProjectItem)
