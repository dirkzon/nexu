import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { User } from "src/domain/models/User";
import { ValidateClass } from "src/infrastructure/services/validator";
import { UserStore } from "../ports/user.store";
import { GetUserByIdQuery } from "../queries/get-user.query";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(readonly userStore: UserStore) {}

    async execute(query: GetUserByIdQuery): Promise<User> {
        await ValidateClass(query);
        return await this.userStore.GetUserById(query.id);
    }
}