import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Comment } from '../../domain/models/comment';
import { ValidateClass } from '../../infrastructure/services/validator';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { CommentStore } from '../ports/comment.store';
import { UserStore } from '../ports/user.store';
import { v4 } from 'uuid';

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    private readonly commentStore: CommentStore,
    private readonly userStore: UserStore,
  ) {}

  async execute(command: CreateCommentCommand): Promise<Comment> {
    ValidateClass(command);
    const user = await this.userStore.getUserById(command.createdBy);
    return await this.commentStore.CreateComment({
      createdAt: new Date(),
      comment: command.comment,
      createdBy: user,
      postId: command.postId,
      id: v4(),
    });
  }
}
