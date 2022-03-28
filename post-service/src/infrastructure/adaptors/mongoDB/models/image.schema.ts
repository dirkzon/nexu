import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ImageDocument = ImageEntity & Document;

@Schema()
export class ImageEntity {
    @Prop({ required: true })
    id: string;
    @Prop({ required: true })
    url: string;
    @Prop({ required: true })
    height: number;
    @Prop({ required: true })
    width: number;
}

export const ImageSchema = SchemaFactory.createForClass(ImageEntity);