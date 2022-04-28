import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ValidateClass } from "../../infrastructure/services/validator";
import { UserStore } from "../ports/user.store";
import { SearchUserQuery } from "../queries/search-users.query";

@QueryHandler(SearchUserQuery)
export class SearchUserQueryHandler implements IQueryHandler<SearchUserQuery> {
    constructor(readonly userStore: UserStore) {}

    async execute(query: SearchUserQuery): Promise<any> {
        await ValidateClass(query);
        return await this.userStore.SearchUsers(query.query, {first: query.first, from: query.from});
    }
}