import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentUser } from './user';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;
  @Field()
  comment: string;
  @Field()
  createdAt: Date;
  @Field()
  createdBy: CommentUser;
  @Field()
  postId: string;
}
