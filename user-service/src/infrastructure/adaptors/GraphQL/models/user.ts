import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Image } from './image';

@ObjectType()
export class User {
  @Field()
  name: string;
  @Field(() => ID)
  id: string;
  @Field()
  email: string;
  @Field()
  createdAt: Date;
  @Field()
  bio?: string;
  @Field(() => Image)
  avatar: Image;
}
