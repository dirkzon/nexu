import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostStore } from '../ports/post.store';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';
import { Post } from '../../domain/models/Post';
import { ValidateClass } from '../../infrastructure/services/validator';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler implements IQueryHandler<GetPostByIdQuery> {
    constructor(private readonly store: PostStore) {}

    async execute(query: GetPostByIdQuery): Promise<Post> {
        await ValidateClass(query);
        return await this.store.GetPostById(query.id);
    }
}