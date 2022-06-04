import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAvatarCommand } from '../commands/update-avatar.command';
import { PostStore } from '../ports/post.store';

@CommandHandler(UpdateAvatarCommand)
export class UpdateAvatarCommandHandler
  implements ICommandHandler<UpdateAvatarCommand>
{
  constructor(private readonly postStore: PostStore) {}

  async execute(command: UpdateAvatarCommand): Promise<any> {
    await this.postStore.UpdateAvatar(
      {
        id: command.id,
        url: command.url,
        height: command.height,
        width: command.width,
      },
      command.userId,
    );
  }
}
