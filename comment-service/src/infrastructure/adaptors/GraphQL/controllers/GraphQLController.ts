import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCommentCommand } from '../../../../application/commands/create-comment.command';
import { GetCommentsForPostQuery } from '../../../../application/queries/get-comments-for-post.query';
import { Comment } from '../models/Comment';
import { CreateCommentInput } from '../models/CreateCommentInput';

@Resolver(Comment)
export class GraphqlController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Comment)
  async CreateComment(
    @Args({ name: 'new_comment', type: () => CreateCommentInput })
    new_comment: CreateCommentInput,
    @Context() context,
  ) {
    return await this.commandBus.execute(
      new CreateCommentCommand(
        new_comment.comment,
        new_comment.post_id,
        context.user.id,
      ),
    );
  }

  @Query(() => [Comment])
  async getCommentByPostId(
    @Args({ name: 'post_id', type: () => String }) post_id: string,
  ) {
    console.log(post_id)
    return await this.queryBus.execute(new GetCommentsForPostQuery(post_id));
  }
}
