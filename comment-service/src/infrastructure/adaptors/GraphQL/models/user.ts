import { Field, ID, ObjectType } from '@nestjs/graphql';

//cannot name this object 'User' cause @nestjs/graphql does not have the 'shareable' directive 😑
@ObjectType()
export class CommentUser {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
}
