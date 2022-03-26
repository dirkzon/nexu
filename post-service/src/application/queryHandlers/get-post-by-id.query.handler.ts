import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Post } from 'src/domain/models/Post';
import { PostStore } from '../ports/post.store';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler implements IQueryHandler<GetPostByIdQuery> {
    constructor(private readonly store: PostStore) {}

    execute(query: GetPostByIdQuery): Promise<Post> {
        return this.store.GetPostById(query.id);
    }
}