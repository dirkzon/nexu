import { PostCreatedEventHandler } from './post-created.event.handler';
import { PostDeletedEventHandler } from './post-deleted.event.handler';

export const EventHandlers = [PostCreatedEventHandler, PostDeletedEventHandler];
