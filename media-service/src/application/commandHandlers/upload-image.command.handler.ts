import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadImageCommand } from '../commands/upload-image.command';
import { MediaStore } from '../ports/mediaStore';
import { v4 } from 'uuid';
import { ValidateClass } from '../../infrastructure/services/validator';

@CommandHandler(UploadImageCommand)
export class UploadImageCommandHandler
  implements ICommandHandler<UploadImageCommand>
{
  constructor(private readonly mediaStore: MediaStore) {}

  async execute(command: UploadImageCommand): Promise<void> {
    await ValidateClass(command);
    await this.mediaStore.uploadImage({
      id: v4(),
      ...command,
    });
  }
}
