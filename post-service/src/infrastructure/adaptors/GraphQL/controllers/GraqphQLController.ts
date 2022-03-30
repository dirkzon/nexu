import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Resolver, Query, Args, Mutation,  } from "@nestjs/graphql";
import { CreatePostCommand } from "src/application/commands/create-post.command";
import { GetPostByIdQuery } from "src/application/queries/get-post-by-id.query";
import { Post } from "../models/post";
import { PostInput } from "../models/post.input";

@Resolver(() => Post)
export class GraphQLController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        ) {}

    @Query(() => Post)
    async GetPostById(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.queryBus.execute(new GetPostByIdQuery(id))
    }

    @Mutation(() => Post)
    async CreatePost(@Args({name: 'post_input', type: () => PostInput}) input: PostInput) {
        return await this.commandBus.execute(new CreatePostCommand(input.createdBy, input.description));
    }
}