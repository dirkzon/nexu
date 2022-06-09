import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../domain/models/user';
import { ValidateClass } from '../../infrastructure/services/validator';
import { UpdateUserCommand } from '../commands/update-user.command';
import { AuthStore } from '../ports/AuthStore';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(readonly authStore: AuthStore) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    await ValidateClass(command);
    const oldUser = await this.authStore.getUserById(command.id);
    return await this.authStore.updateUser({
      id: oldUser.id,
      email: oldUser.email,
      passwordHash: oldUser.passwordHash,
      name: command.name,
    });
  }
}
