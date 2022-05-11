import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UploadImageCommand } from '../commands/upload-image.command';
import { MediaStore } from '../ports/mediaStore';
import { v4 } from 'uuid';
import { ValidateClass } from '../../infrastructure/services/validator';
import { resizeImage } from '../../domain/services/image.service';
import { Image } from '../../domain/models/Image';
import { ImageUploadedEvent } from '../events/image-uploaded.event';

@CommandHandler(UploadImageCommand)
export class UploadImageCommandHandler
  implements ICommandHandler<UploadImageCommand>
{
  constructor(
    private readonly mediaStore: MediaStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UploadImageCommand): Promise<Image> {
    await ValidateClass(command);
    const { buffer, width, height } = await resizeImage(command.buffer);
    const id = v4();
    return await this.mediaStore
      .uploadImage({
        id: id,
        buffer: buffer,
        name: command.name,
        encoding: command.encoding,
        mimetype: command.mimetype,
      })
      .then(async (url) => {
        await this.eventBus.publish(
          new ImageUploadedEvent(id, command.postId, width, height, url),
        );
        return {
          url: url,
          width: width,
          height: height,
        };
      })
      .catch((e) => {
        throw e;
      });
  }
}
