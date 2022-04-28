import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchUserInput {
    @Field()
    query: string;
}