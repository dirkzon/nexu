import { Inject, RequestTimeoutException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, throwError, timeout, TimeoutError } from "rxjs";
import { UserCreatedEvent } from "../events/user-created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
    constructor(@Inject('USER_SERVICE') readonly client: ClientProxy) {}

    async handle(event: UserCreatedEvent) {
        console.log(`User with id:'${event.id}' created`);
        this.client.emit('user_created', event).pipe(
            timeout(5000), 
            catchError((err) => {
                throw err;
        })).toPromise();
    }
}