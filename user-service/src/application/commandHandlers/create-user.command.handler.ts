import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ValidateClass } from "src/infrastructure/services/validator";
import { CreateUserCommand } from "../commands/create-user.command";
import { UserStore } from "../ports/user.store";
import { v4 } from "uuid";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    constructor(readonly userStore: UserStore) {}

    async execute(command: CreateUserCommand): Promise<any> {
        await ValidateClass(command);
        return await this.userStore.CreateUser({
            ...command,
            id: v4(),
            createdAt: new Date(),
            avatar: {
                url: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                height: 720,
                width: 720,
                id: v4(),
            }
        });
    }

}