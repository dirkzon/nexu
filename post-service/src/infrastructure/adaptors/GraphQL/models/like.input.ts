import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LikeInput {
  @Field()
  like: boolean;
  @Field()
  post_id: string;
}
