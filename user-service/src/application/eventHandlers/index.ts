import { UserCreatedEventHandler } from "./user-created.event.handler";
import { UserDeletedEventHandler } from "./user-deleted.event.handler";
import { UserUpdatedEventHandler } from "./user-updated.event.handler";

export const EventsHandlers = [
    UserCreatedEventHandler,
    UserUpdatedEventHandler,
    UserDeletedEventHandler,
]