import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateClass } from '../../infrastructure/services/validator';
import { UpdateUserCommand } from '../commands/update-user.command';
import { CommentStore } from '../ports/comment.store';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly commentStore: CommentStore) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    await ValidateClass(command);
    await this.commentStore.UpdateUser({ name: command.name, id: command.id });
  }
}
