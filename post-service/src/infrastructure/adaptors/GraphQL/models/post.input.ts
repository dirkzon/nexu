import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PostInput {
    @Field()
    createdBy: string;
    @Field()
    description: string;
}