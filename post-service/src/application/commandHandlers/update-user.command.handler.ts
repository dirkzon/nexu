import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { PostStore } from '../ports/post.store';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly postStore: PostStore) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    await this.postStore.UpdateUser({ name: command.name, id: command.id });
  }
}
