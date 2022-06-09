import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateClass } from '../../infrastructure/services/validator';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { AuthStore } from '../ports/AuthStore';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(readonly authStore: AuthStore) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await ValidateClass(command);
    await this.authStore.deleteUser(command.id);
  }
}
