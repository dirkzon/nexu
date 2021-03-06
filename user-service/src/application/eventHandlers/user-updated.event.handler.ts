import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdatedEvent } from '../events/user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  constructor(@Inject('USER_SERVICE') readonly client: ClientProxy) {}

  async handle(event: UserUpdatedEvent) {
    console.log(`User with id:'${event.id}' updated`);
    this.client.emit('user_updated', event);
    this.client.emit('user_updated', event);
    this.client.emit('user_updated', event);
  }
}
