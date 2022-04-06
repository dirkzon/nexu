import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AuthDocument = AuthEntity & Document

@Schema()
export class AuthEntity {
    @Prop({ required: true })
    id: string;
    @Prop({ required: true })
    passwordHash: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    name: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthEntity);