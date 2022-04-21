import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserCommand } from "../../../../application/commands/create-user.command";
import { GetUserByIdQuery } from "../../../../application/queries/get-user.query";
import { User } from "../models/user";
import { UserInput } from "../models/user.input";

@Resolver(() => User)
export class GraphQLController {
    constructor(
        readonly queryBus: QueryBus,
        readonly commandBus: CommandBus,
        ) {}

    @Query(() => User)
    async GetUserById(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.queryBus.execute(new GetUserByIdQuery(id));
    }

    @Query(() => User)
    async getSelf(@Context() context) {
        return await this.queryBus.execute(new GetUserByIdQuery(context.user.id));
    }

    @Mutation(() => User)
    async CreateUser(@Args({ name: 'new_user', type: () => UserInput }) new_user: UserInput) {
        return await this.commandBus.execute(
            new CreateUserCommand(
                new_user.name, 
                new_user.email,
                new_user.bio, 
                new_user.password
            )
        );
    }
}
