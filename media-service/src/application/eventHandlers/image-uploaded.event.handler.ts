import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { ImageUploadedEvent } from '../events/image-uploaded.event';

@EventsHandler(ImageUploadedEvent)
export class ImageUploadedEventHandler
  implements IEventHandler<ImageUploadedEvent>
{
  constructor(@Inject('MEDIA_SERVICE') readonly client: ClientProxy) {}

  async handle(event: ImageUploadedEvent) {
    console.log(
      `Image with id:'${event.id}' has been uploaded for post:'${event.postId}'`,
    );
    this.client.emit('image_uploaded', event);
  }
}
