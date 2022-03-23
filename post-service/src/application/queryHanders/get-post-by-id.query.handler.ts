import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Post } from 'src/domain/models/Post';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler implements IQueryHandler<GetPostByIdQuery> {
    execute(query: GetPostByIdQuery): Promise<Post> {
        throw new Error('Method not implemented.');
    } 
}