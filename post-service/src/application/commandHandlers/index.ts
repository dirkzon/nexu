import { CreatePostCommnandHandler } from './create-post.command.handler';
import { SetImageCommandHandler } from './set-image.command.handler';
import { SetLikeCommandHandler } from './set-like.command.handler';
import { UpdateAvatarCommandHandler } from './update-avatar.command.handler';
import { UpdateUserCommandHandler } from './update-user.command.handler';

export const CommandHandlers = [
  CreatePostCommnandHandler,
  SetImageCommandHandler,
  SetLikeCommandHandler,
  UpdateUserCommandHandler,
  UpdateAvatarCommandHandler,
];
