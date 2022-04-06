import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthData {
    @Field()
    accessToken: string;
    @Field()
    tokenType: string;
    @Field()
    scope: string;
    // @Field()
    // expiresIn: number;
    // @Field()
    // refreshToken: string;
}