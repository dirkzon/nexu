import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './user.schema';

export type CommentDocument = CommentEntity & Document;

@Schema()
export class CommentEntity {
  @Prop({ required: true })
  comment: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true, type: UserSchema })
  createdBy: UserEntity;
  @Prop({ required: true })
  postId: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);
