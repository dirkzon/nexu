import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from '../events/post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  async handle(event: PostCreatedEvent) {
    console.log(`Post with id:'${event.post_id}' has been created.`);
  }
}
