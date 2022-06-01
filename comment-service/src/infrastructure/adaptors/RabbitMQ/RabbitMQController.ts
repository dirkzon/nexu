import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { UserUpdatedInput } from './models/user-updated.input';
import { UpdateUserCommand } from '../../../application/commands/update-user.command';

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
}
