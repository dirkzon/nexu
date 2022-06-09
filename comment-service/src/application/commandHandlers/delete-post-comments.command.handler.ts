import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateClass } from '../../infrastructure/services/validator';
import { DeletePostCommentsCommand } from '../commands/delete-post-comments.command';
import { CommentStore } from '../ports/comment.store';

@CommandHandler(DeletePostCommentsCommand)
export class DeletePostCommentsCommandHandler
  implements ICommandHandler<DeletePostCommentsCommand>
{
  constructor(private readonly commentStore: CommentStore) {}

  async execute(command: DeletePostCommentsCommand): Promise<any> {
    await ValidateClass(command);
    await this.commentStore.DeletePostComments(command.postId);
  }
}
