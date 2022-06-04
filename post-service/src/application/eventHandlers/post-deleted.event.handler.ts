import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { PostDeletedEvent } from '../events/post-deleted.event';

@EventsHandler(PostDeletedEvent)
export class PostDeletedEventHandler
  implements IEventHandler<PostDeletedEvent>
{
  constructor(@Inject('POST_SERVICE') readonly client: ClientProxy) {}

  async handle(event: PostDeletedEvent) {
    console.log(`Post with id:'${event.id}' deleted`);
    this.client.emit('post_deleted', event);
    this.client.emit('post_deleted', event);
  }
}
