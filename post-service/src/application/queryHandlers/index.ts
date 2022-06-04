import { GetPostByIdQueryHandler } from './get-post-by-id.query.handler';
import { GetAllPostFromUserHandler } from './get-posts-from-user.query.handler';
import { GetPostsQueryHandler } from './get-posts.query.handler';

export const QueryHandlers = [
  GetPostByIdQueryHandler,
  GetPostsQueryHandler,
  GetAllPostFromUserHandler,
];
