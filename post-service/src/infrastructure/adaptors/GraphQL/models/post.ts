import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Image } from './image'

@ObjectType()
export class Post {
    @Field(() => ID)
    id: string;
    @Field()
    description: string;
    @Field()
    createdAt: Date;
    @Field()
    createdBy: string;
    @Field(() => Image)
    images: Image[];
}