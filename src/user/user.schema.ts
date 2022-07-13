import {userRole} from "../utils/enums/userRole";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class UserItem extends Document{

    @Prop({ required: true})
    email: string;

    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    surname: string;

    @Prop({ required: true})
    password: string;

    @Prop({ default: ""})
    currentTokenId: string | null;

    @Prop({ default: ""})
    position: string;

    @Prop({ default: userRole.TEST_USER})
    role: userRole;

    @Prop()
    tasks: [string];

    @Prop()
    projects: [string];

    @Prop({ type: { name: String, isSelected: Boolean}, default: { name: "", isSelected: false} })
    department: { name: string, isSelected: boolean };
}

export const UserSchema = SchemaFactory.createForClass(UserItem);