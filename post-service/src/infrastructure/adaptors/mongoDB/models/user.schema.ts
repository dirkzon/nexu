import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvatarEntity, AvatarSchema } from './avatar.schema';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({
    required: true,
    type: AvatarSchema,
  })
  avatar: AvatarEntity;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
