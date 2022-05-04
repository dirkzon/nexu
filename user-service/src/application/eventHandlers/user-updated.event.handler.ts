import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs';
import { UserUpdatedEvent } from '../events/user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  constructor(@Inject('USER_SERVICE') readonly client: ClientProxy) {}

  async handle(event: UserUpdatedEvent) {
    console.log(`User with id:'${event.id}' updated`);
    this.client.emit('user-updated', event).pipe(
      timeout(5000),
      catchError((err) => {
        throw err;
      }),
    );
  }
}
