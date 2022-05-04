import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCommand } from '../../../../application/commands/create-user.command';
import { DeleteUserCommand } from '../../../../application/commands/delete-user.command';
import { UpdateUserCommand } from '../../../../application/commands/update-user.command';
import { GetUserByIdQuery } from '../../../../application/queries/get-user.query';
import { SearchUserQuery } from '../../../../application/queries/search-users.query';
import { Pagination } from '../models/pagination';
import { SearchUserInput } from '../models/search-user.input';
import { UpdateUserInput } from '../models/update-user.input';
import { User } from '../models/user';
import { UserInput } from '../models/user.input';

@Resolver(() => User)
export class GraphQLController {
  constructor(readonly queryBus: QueryBus, readonly commandBus: CommandBus) {}

  @Query(() => User)
  async GetUserById(@Args({ name: 'id', type: () => String }) id: string) {
    return await this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Query(() => User)
  async getSelf(@Context() context) {
    return await this.queryBus.execute(new GetUserByIdQuery(context.user.id));
  }

  @Mutation(() => User)
  async CreateUser(
    @Args({ name: 'new_user', type: () => UserInput }) new_user: UserInput,
  ) {
    return await this.commandBus.execute(
      new CreateUserCommand(
        new_user.name,
        new_user.email,
        new_user.bio,
        new_user.password,
      ),
    );
  }

  @Mutation(() => User)
  async UpdateSelf(
    @Args({ name: 'user', type: () => UpdateUserInput }) user: UpdateUserInput,
    @Context() context,
  ) {
    return await this.commandBus.execute(
      new UpdateUserCommand(context.user.id, user.name, user.bio),
    );
  }

  @Mutation(() => Boolean)
  async DeleteSelf(@Context() context) {
    return await this.commandBus
      .execute(new DeleteUserCommand(context.user.id))
      .catch(() => {
        return 0;
      })
      .then(() => {
        return 1;
      });
  }

  @Query(() => [User])
  async SearchUsers(
    @Args({ name: 'search', type: () => SearchUserInput })
    query: SearchUserInput,
    @Args({ name: 'pagination', type: () => Pagination })
    pagination: Pagination,
  ) {
    return await this.queryBus.execute(
      new SearchUserQuery(
        { first: pagination.first, from: pagination.from },
        query.query,
      ),
    );
  }
}
