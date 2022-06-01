import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DeleteUserCommand } from '../../../../application/commands/delete-user.command';
import { UpdateUserCommand } from '../../../../application/commands/update-user.command';
import { UserCreatedCommand } from '../../../../application/commands/user-created.command';
import { UserCreatedInput } from '../models/user-created.input';

@Controller()
export class RabbitMQController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('user_created')
  async UserCreated(
    @Payload() data: UserCreatedInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('Recieved user-created event');
    await this.commandBus
      .execute(
        new UserCreatedCommand(data.id, data.name, data.email, data.password),
      )
      .catch((e) => {
        context.getChannelRef().reject(e, false);
      });
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern('user_updated')
  async UserUpdated(
    @Payload() data: UserCreatedInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('user-updated event recieved');
    await this.commandBus
      .execute(new UpdateUserCommand(data.id, data.name))
      .catch((e) => {
        context.getChannelRef().reject(e, false);
      });
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern('user_deleted')
  async UserDeleted(
    @Payload() data: UserCreatedInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('Recieved user-deleted event');
    await this.commandBus.execute(new DeleteUserCommand(data.id)).catch((e) => {
      context.getChannelRef().reject(e, false);
    });
    context.getChannelRef().ack(context.getMessage());
  }
}
