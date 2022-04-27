import { CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LoginCommand } from "../../../../application/commands/login.command";
import { AuthData } from "../models/AuthData";

@Resolver(() => AuthData)
export class GraphQLController {

    constructor(readonly commandBus: CommandBus) {}

    @Mutation(() => AuthData)
    async login(
        @Args({ name: 'user', type: () => String }) user: string,
        @Args({ name: 'password', type: () => String }) password: string,
        @Args({ name: 'scope', type: () => [String] }) scope: string[]
    ) {
        return await this.commandBus.execute(new LoginCommand(user, password, scope));
    }
}