import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { resizeImage } from '../../domain/services/image.service';
import { ValidateClass } from '../../infrastructure/services/validator';
import { UploadAvatarCommand } from '../commands/upload-avatar.command';
import { MediaStore } from '../ports/mediaStore';
import { Image } from '../../domain/models/Image';
import { AvatarUploadedEvent } from '../events/avatar-uploaded.event';

@CommandHandler(UploadAvatarCommand)
export class UploadAvatarCommandHandler
  implements ICommandHandler<UploadAvatarCommand>
{
  constructor(
    private readonly mediaStore: MediaStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UploadAvatarCommand): Promise<Image> {
    await ValidateClass(command);
    const { buffer, width, height } = await resizeImage(command.buffer, [1, 1]);
    return await this.mediaStore
      .uploadImage({
        id: command.avatarId,
        buffer: buffer,
        name: command.avatarId,
        encoding: command.encoding,
        mimetype: command.mimetype,
      })
      .then(async (url) => {
        await this.eventBus.publish(
          new AvatarUploadedEvent(
            command.avatarId,
            command.userId,
            width,
            height,
            url,
          ),
        );
        return {
          id: command.avatarId,
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
