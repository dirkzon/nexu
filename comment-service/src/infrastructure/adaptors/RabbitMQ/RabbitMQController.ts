import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { UserUpdatedInput } from './models/user-updated.input';
import { UpdateUserCommand } from '../../../application/commands/update-user.command';
import { DeletePostCommentsCommand } from '../../../application/commands/delete-post-comments.command';
import { PostDeletedInput } from './models/post-deleted.input';

@Controller()
export class RabbitMQController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('user_updated')
  async UserUpdated(
    @Payload() data: UserUpdatedInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('user-updated event recieved');
    await this.commandBus
      .execute(new UpdateUserCommand(data.name, data.id))
      .catch((e) => {
        context.getChannelRef().reject(e, false);
      });
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern('user_created')
  async createUser() {
    //
  }

  @EventPattern('post_deleted')
  async deletePost(
    @Payload() data: PostDeletedInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('post deleted event recieved');
    this.commandBus.execute(new DeletePostCommentsCommand(data.id));
    context.getChannelRef().ack(context.getMessage());
  }
}
