import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserStore } from '../ports/user.store';
import { v4 } from 'uuid';
import { UserCreatedEvent } from '../events/user-created.event';
import { ValidateClass } from '../../infrastructure/services/validator';
import { User } from '../../domain/models/User';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(readonly userStore: UserStore, readonly eventBus: EventBus) {}

  async execute(command: CreateUserCommand): Promise<User> {
    await ValidateClass(command);
    return await this.userStore
      .CreateUser({
        ...command,
        id: v4(),
        createdAt: new Date(),
        avatar: {
          url: 'https://nexumedia.blob.core.windows.net/nexu-image-container/placeholderavatar.png',
          height: 416,
          width: 416,
          id: v4(),
        },
      })
      .then(async (user) => {
        await this.eventBus.publish(
          new UserCreatedEvent(
            user.name,
            user.email,
            user.id,
            command.password,
          ),
        );
        return user;
      });
  }
}
