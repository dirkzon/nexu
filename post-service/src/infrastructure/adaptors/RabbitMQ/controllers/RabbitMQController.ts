import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { ImageUploadedInput } from '../models/image-uploaded.input';
import { SetImageCommand } from '../../../../application/commands/set-image.command';

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
}
