import { CanCommentQueryHandler } from './can-comment.query.handler';
import { GetCommentsForPostHandler } from './get-commets-for-post.query.handler';

export const QueryHandlers = [
  GetCommentsForPostHandler,
  CanCommentQueryHandler,
];
