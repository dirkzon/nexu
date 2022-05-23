import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ImageEntity, ImageSchema } from './image.schema';
import { UserEntity, UserSchema } from './user.schema';

export type PostDocument = PostEntity & Document;

@Schema()
export class PostEntity {
  @Prop({ required: true })
  id: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({
    type: UserSchema,
    required: true,
  })
  createdBy: UserEntity;
  @Prop({
    type: [ImageSchema],
    required: true,
  })
  images: ImageEntity[];
  @Prop({ required: true })
  totalLikes: number;
  @Prop({ required: true })
  likedBy: string[];
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
