import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Post } from '../../domain/models/Post';
import { ValidateClass } from '../../infrastructure/services/validator';
import { SetImageCommand } from '../commands/set-image.command';
import { PostStore } from '../ports/post.store';

@CommandHandler(SetImageCommand)
export class SetImageCommandHandler
  implements ICommandHandler<SetImageCommand>
{
  constructor(private readonly postStore: PostStore) {}

  async execute(command: SetImageCommand): Promise<Post> {
    await ValidateClass(command);
    return await this.postStore.AddImage(
      {
        id: command.id as string,
        url: command.url,
        width: command.width,
        height: command.height,
      },
      command.postId,
    );
  }
}
