import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvatarDocument = AvatarEntity & Document;

@Schema()
export class AvatarEntity {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  height: number;
  @Prop({ required: true })
  width: number;
}

export const AvatarSchema = SchemaFactory.createForClass(AvatarEntity);
