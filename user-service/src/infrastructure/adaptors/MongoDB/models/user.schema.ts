import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ImageEntity } from "./image.schema";

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
    @Prop({ required: true })
    id: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    createdAt: Date;
    @Prop({ required: true })
    bio: string;
    @Prop({ required: true })
    avatar: ImageEntity;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);