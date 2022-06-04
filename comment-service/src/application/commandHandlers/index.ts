import { CreateCommentCommandHandler } from './create-comment.command.handler';
import { DeletePostCommentsCommandHandler } from './delete-post-comments.command.handler';
import { UpdateUserCommandHandler } from './update-user.command.handler';

export const CommandHandlers = [
  CreateCommentCommandHandler,
  UpdateUserCommandHandler,
  DeletePostCommentsCommandHandler,
];
