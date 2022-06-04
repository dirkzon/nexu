import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentStore } from '../ports/comment.store';
import { CanCommentQuery } from '../queries/can-comment-on-post.query';

@QueryHandler(CanCommentQuery)
export class CanCommentQueryHandler implements IQueryHandler<CanCommentQuery> {
  constructor(private readonly commentStore: CommentStore) {}

  async execute(query: CanCommentQuery): Promise<boolean> {
    return await this.commentStore.CanComment(query.postId, query.userId);
  }
}
