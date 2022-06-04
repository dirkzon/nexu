import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { ImageUploadedInput } from '../models/image-uploaded.input';
import { SetImageCommand } from '../../../../application/commands/set-image.command';
import { UserUpdatedInput } from '../models/user-updated.input';
import { UpdateUserCommand } from '../../../../application/commands/update-user.command';
import { UpdateAvatarInput } from '../models/update-avatar.input';
import { UpdateAvatarCommand } from '../../../../application/commands/update-avatar.command';

@Controller()
export class RabbitMQController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('image_uploaded')
  async ImageUploadedForPost(
    @Payload() data: ImageUploadedInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('image-uploaded event recieved');
    await this.commandBus
      .execute(
        new SetImageCommand(
          data.id,
          data.postId,
          data.width,
          data.height,
          data.url,
        ),
      )
      .catch((e) => {
        context.getChannelRef().reject(e, false);
      });
    context.getChannelRef().ack(context.getMessage());
  }

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

  @EventPattern('avatar_uploaded')
  async updateAvatar(
    @Payload() updatedAvatar: UpdateAvatarInput,
    @Ctx() context: RmqContext,
  ) {
    console.log('avatar-uploaded event recieved');
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

  @EventPattern('user_created')
  async createUser() {
    //
  }
}
