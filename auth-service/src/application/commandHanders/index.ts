import { LoginCommandHandler } from "./login.command.handler";
import { UpdateUserCommandHandler } from "./update-user.command.handler";
import { UserCreatedCommandHandler } from "./user-created.command.handler";

export const CommandHandlers = [
    LoginCommandHandler,
    UserCreatedCommandHandler,
    UpdateUserCommandHandler,
]