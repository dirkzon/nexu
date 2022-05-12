import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../commands/create-post.command';
import { PostStore } from '../ports/post.store';
import { v4 } from 'uuid';
import { ValidateClass } from '../../infrastructure/services/validator';

@CommandHandler(CreatePostCommand)
export class CreatePostCommnandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(private readonly store: PostStore) {}

  async execute(command: CreatePostCommand): Promise<any> {
    await ValidateClass(command);
    return await this.store.CreatePost({
      id: v4(),
      description: command.description,
      createdBy: command.createdBy,
      createdAt: new Date(),
      images: [],
    });
  }
}
