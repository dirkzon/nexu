import { Controller } from '@nestjs/common';
import { GetUserByIdQuery } from '../../../../application/queries/get-user.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UpdateAvatarInput } from '../models/update-avatar.input';
import { UpdateAvatarCommand } from '../../../../application/commands/update-avatar.command';

@Controller()
export class RabbitMQController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern({ cmd: 'get-user' })
  async getUserById(@Payload() id: string, @Ctx() context: RmqContext) {
    return await this.queryBus
      .execute(new GetUserByIdQuery(id))
      .then((user) => {
        context.getChannelRef().ack(context.getMessage());
        console.log(user);
        return user;
      });
  }

  @EventPattern('avatar_uploaded')
  async updateAvatar(
    @Payload() updatedAvatar: UpdateAvatarInput,
    @Ctx() context: RmqContext,
  ) {
    console.log(updatedAvatar);
    await this.commandBus.execute(
      new UpdateAvatarCommand(
        updatedAvatar.id,
        updatedAvatar.userId,
        updatedAvatar.height,
        updatedAvatar.width,
        updatedAvatar.url,
      ),
    );
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern('image_uploaded')
  async createUser() {
    //
  }
}
