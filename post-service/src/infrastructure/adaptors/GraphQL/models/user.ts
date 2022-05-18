import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Avatar } from './avatar';

//cannot name this object 'User' cause @nestjs/graphql does not have the 'shareable' directive 😒
@ObjectType()
export class PostUser {
  @Field()
  name: string;
  @Field()
  createdAt: Date;
  @Field()
  avatar: Avatar;
  @Field(() => ID)
  id: string;
}
