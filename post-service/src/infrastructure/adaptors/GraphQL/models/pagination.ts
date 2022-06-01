import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field()
  first: number;
  @Field()
  from: number;
}
