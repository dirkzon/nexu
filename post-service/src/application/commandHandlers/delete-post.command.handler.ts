import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { deletePostCommand } from '../commands/delete-post.command';
import { PostDeletedEvent } from '../events/post-deleted.event';
import { PostStore } from '../ports/post.store';

@CommandHandler(deletePostCommand)
export class deletePostCommandHandler
  implements ICommandHandler<deletePostCommand>
{
  constructor(
    private readonly postStore: PostStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: deletePostCommand): Promise<boolean> {
    const post = await this.postStore.GetPostById(command.postId);
    if (post.createdBy.id !== command.userId) {
      throw new Error('You do not own this post');
    }
    await this.eventBus.publish(new PostDeletedEvent(command.postId));
    return await this.postStore.DeletePost(command.postId).then(async () => {
      await this.eventBus.publish(new PostDeletedEvent(command.postId));
      return true;
    });
  }
}
