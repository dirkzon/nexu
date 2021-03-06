import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreatedEvent } from '../events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(@Inject('USER_SERVICE') readonly client: ClientProxy) {}

  async handle(event: UserCreatedEvent) {
    console.log(`User with id:'${event.id}' created`);
    this.client.emit('user_created', event);
    this.client.emit('user_created', event);
  }
}
