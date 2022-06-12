import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserCreatedCommand } from "../commands/user-created.command";
import { AuthStore } from "../ports/AuthStore";
import * as bcrypt from 'bcrypt';
import { ValidateClass } from "../../infrastructure/services/validator";
import { User } from "../../domain/models/User";

@CommandHandler(UserCreatedCommand)
export class UserCreatedCommandHandler implements ICommandHandler<UserCreatedCommand> {
    constructor(readonly authStore: AuthStore) {}

    async execute(command: UserCreatedCommand): Promise<User> {
        await ValidateClass(command);
        const hashedPassword = await bcrypt.hash(command.password, 10);
        return await this.authStore.createUser({
            id: command.id,
            name: command.name,
            passwordHash: hashedPassword,
            email: command.email,
        });
    }
}