import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ImageEntity } from './image.schema';

export type PostDocument = PostEntity & Document;

@Schema()
export class PostEntity {
    @Prop({ required: true })
    id: string;
    @Prop()
    description?: string;
    @Prop({ required: true })
    createdAt: string;
    @Prop({ required: true })
    createdBy: string;
    @Prop({type: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Image'}], required: true})
    images: ImageEntity[];
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);