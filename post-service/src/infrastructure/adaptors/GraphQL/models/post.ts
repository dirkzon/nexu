import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Image } from './image';
import { PostUser } from './user';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;
  @Field()
  description: string;
  @Field()
  createdAt: Date;
  @Field()
  createdBy: PostUser;
  @Field(() => [Image])
  images: Image[];
  @Field()
  totalLikes: number;
  @Field()
  liked: boolean;
}
