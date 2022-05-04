import { CreateUserCommandHandler } from './create-user.command.handler';
import { DeleteUserCommandHandler } from './delete-user.command.handler';
import { UpdateUserCommandHandler } from './update-user-command.handler';

export const CommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
];
