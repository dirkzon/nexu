import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Post } from 'src/domain/models/Post';
import { PostStore } from '../ports/post.store';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';
import { ValidateClass } from 'src/infrastructure/services/validator';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler implements IQueryHandler<GetPostByIdQuery> {
    constructor(private readonly store: PostStore) {}

    async execute(query: GetPostByIdQuery): Promise<Post> {
        await ValidateClass(query);
        return await this.store.GetPostById(query.id);
    }
}