import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ValidateClass } from '../../infrastructure/services/validator';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UserStore } from '../ports/user.store';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(readonly userStore: UserStore, readonly eventBus: EventBus) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await ValidateClass(command);
    await this.userStore.DeleteUser(command.id).then(async () => {
      await this.eventBus.publish(new UserDeletedEvent(command.id));
    });
  }
}
