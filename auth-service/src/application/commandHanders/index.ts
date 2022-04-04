import { LoginCommandHandler } from "./login.command.handler";
import { UserCreatedCommandHandler } from "./user-created.command";

export const CommandHandlers = [
    LoginCommandHandler,
    UserCreatedCommandHandler,
]