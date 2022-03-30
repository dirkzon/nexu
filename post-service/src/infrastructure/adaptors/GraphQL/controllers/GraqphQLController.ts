import { QueryBus } from "@nestjs/cqrs";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { GetPostByIdQuery } from "src/application/queries/get-post-by-id.query";
import { Post } from "../models/post";

@Resolver(() => Post)
export class GraphQLController {
    constructor(private readonly queryBus: QueryBus) {}

    @Query(() => Post)
    async GetPostById(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.queryBus.execute(new GetPostByIdQuery(id))
    }
}