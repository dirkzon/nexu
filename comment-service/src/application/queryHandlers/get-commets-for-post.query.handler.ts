import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from '../../domain/models/comment';
import { ValidateClass } from '../../infrastructure/services/validator';
import { CommentStore } from '../ports/comment.store';
import { GetCommentsForPostQuery } from '../queries/get-comments-for-post.query';

@QueryHandler(GetCommentsForPostQuery)
export class GetCommentsForPostHandler
  implements IQueryHandler<GetCommentsForPostQuery>
{
  constructor(private readonly commentStore: CommentStore) {}

  async execute(query: GetCommentsForPostQuery): Promise<Comment> {
    await ValidateClass(query);
    return await this.commentStore
      .GetAllCommentsForPost(query.postId)
      .then((comments: Comment[]) => {
        return comments.sort((a, b) => {
          if (a.createdAt.getTime() === b.createdAt.getTime()) {
            return 0;
          }
          return a.createdAt.getTime() > b.createdAt.getTime() ? -1 : 1;
        });
      });
  }
}
