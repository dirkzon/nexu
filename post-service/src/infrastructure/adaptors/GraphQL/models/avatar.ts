import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Avatar {
  @Field(() => ID)
  id: string;
  @Field()
  url: string;
  @Field()
  height: number;
  @Field()
  width: number;
}
