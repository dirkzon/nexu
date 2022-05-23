import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../commands/create-post.command';
import { PostStore } from '../ports/post.store';
import { v4 } from 'uuid';
import { ValidateClass } from '../../infrastructure/services/validator';
import { UserStore } from '../ports/user.store';
import { User } from '../../domain/models/User';

@CommandHandler(CreatePostCommand)
export class CreatePostCommnandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(
    private readonly postStore: PostStore,
    private readonly userStore: UserStore,
  ) {}

  async execute(command: CreatePostCommand): Promise<any> {
    await ValidateClass(command);
    const user = await this.userStore.getUserById(command.createdBy);
    return await this.postStore.CreatePost({
      id: v4(),
      description: command.description,
      createdBy: user as User,
      createdAt: new Date(),
      images: [],
      totalLikes: 0,
    });
  }
}
