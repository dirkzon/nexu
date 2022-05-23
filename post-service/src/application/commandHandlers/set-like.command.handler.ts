import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateClass } from '../../infrastructure/services/validator';
import { SetLikeCommand } from '../commands/set-like.command';
import { PostStore } from '../ports/post.store';

@CommandHandler(SetLikeCommand)
export class SetLikeCommandHandler implements ICommandHandler<SetLikeCommand> {
  constructor(private readonly postStore: PostStore) {}

  async execute(command: SetLikeCommand): Promise<number> {
    await ValidateClass(command);
    const liked = await this.postStore.HasUserLiked(
      command.likedBy,
      command.postId,
    );
    if (liked && command.like) {
      throw new Error('Post is already liked');
    }
    return await this.postStore
      .SetLike(command.like, command.postId, command.likedBy)
      .then((post) => {
        return post.totalLikes;
      });
  }
}
