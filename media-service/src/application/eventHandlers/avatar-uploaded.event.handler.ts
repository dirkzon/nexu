import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { AvatarUploadedEvent } from '../events/avatar-uploaded.event';

@EventsHandler(AvatarUploadedEvent)
export class AvatarUploadedEventHandler
  implements IEventHandler<AvatarUploadedEvent>
{
  constructor(@Inject('MEDIA_SERVICE') readonly client: ClientProxy) {}

  handle(event: AvatarUploadedEvent) {
    console.log(
      `Avatar with id:'${event.id}' has been uploaded for user:'${event.userId}'`,
    );
    this.client.emit('avatar_uploaded', event);
  }
}
