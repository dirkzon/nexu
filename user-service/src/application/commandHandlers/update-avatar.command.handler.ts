import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAvatarCommand } from '../commands/update-avatar.command';
import { UserStore } from '../ports/user.store';

@CommandHandler(UpdateAvatarCommand)
export class UpdateAvatarCommandHandler
  implements ICommandHandler<UpdateAvatarCommand>
{
  constructor(private readonly userStore: UserStore) {}

  async execute(command: UpdateAvatarCommand): Promise<any> {
    await this.userStore.UpdateAvatar(
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
