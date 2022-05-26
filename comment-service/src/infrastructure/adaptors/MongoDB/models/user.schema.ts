import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
