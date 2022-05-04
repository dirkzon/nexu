import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ValidateClass } from '../../infrastructure/services/validator';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserStore } from '../ports/user.store';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(readonly userStore: UserStore, readonly eventBus: EventBus) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    await ValidateClass(command);
    const oldUser = await this.userStore.GetUserById(command.id);
    return await this.userStore
      .UpdateUser({
        avatar: oldUser.avatar,
        email: oldUser.email,
        id: command.id,
        name: command.name,
        bio: command.bio,
        createdAt: oldUser.createdAt,
      })
      .then(async (user) => {
        await this.eventBus.publish(new UserUpdatedEvent(user.name, user.id));
        return user;
      });
  }
}
