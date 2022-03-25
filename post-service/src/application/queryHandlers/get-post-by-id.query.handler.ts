import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Post } from 'src/domain/models/Post';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler implements IQueryHandler<GetPostByIdQuery> {
    execute(query: GetPostByIdQuery): Promise<Post> {
        console.log(query);
        return null;
    }
}