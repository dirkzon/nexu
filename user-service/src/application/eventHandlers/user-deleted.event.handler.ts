import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, timeout } from "rxjs";
import { UserDeletedEvent } from "../events/user-deleted.event";

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler implements IEventHandler<UserDeletedEvent>{
    constructor(@Inject('USER_SERVICE') readonly client: ClientProxy) {}

    async handle(event: UserDeletedEvent) {
        console.log(`User with id:'${event.id}' deleted`);
        this.client.emit('user-deleted', event).pipe(
            timeout(5000), 
            catchError((err) => {
                throw err;
        }));
    }
}