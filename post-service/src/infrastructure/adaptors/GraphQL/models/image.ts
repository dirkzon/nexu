import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Image {
    @Field(() => ID)
    id: string;
    @Field()
    url: string;
    @Field()
    height: number;
    @Field()
    width: number;
}