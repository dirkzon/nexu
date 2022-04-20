import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Resolver, Query, Args, Mutation, Context,  } from "@nestjs/graphql";
import { CreatePostCommand } from "../../../../application/commands/create-post.command";
import { GetPostByIdQuery } from "../../../../application/queries/get-post-by-id.query";
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
    async CreatePost(
        @Args({name: 'new_post', type: () => PostInput}) input: PostInput,
        @Context() context
    ) {
        return await this.commandBus.execute(new CreatePostCommand(context.user.id, input.description));
    }
}