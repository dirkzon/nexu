import { CreatePostCommnandHandler } from './create-post.command.handler';
import { SetImageCommandHandler } from './set-image.command.handler';
import { SetLikeCommandHandler } from './set-like.command.handler';

export const CommandHandlers = [
  CreatePostCommnandHandler,
  SetImageCommandHandler,
  SetLikeCommandHandler,
];
