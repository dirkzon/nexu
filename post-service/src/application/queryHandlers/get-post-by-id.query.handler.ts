import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostStore } from '../ports/post.store';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';
import { Post } from '../../domain/models/Post';
import { ValidateClass } from '../../infrastructure/services/validator';
import { PostOutput } from '../../domain/models/PostOutput';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler
  implements IQueryHandler<GetPostByIdQuery>
{
  constructor(private readonly store: PostStore) {}

  async execute(query: GetPostByIdQuery): Promise<PostOutput> {
    await ValidateClass(query);
    const liked = !query.userId
      ? false
      : await this.store.HasUserLiked(query.userId, query.id);
    return await this.store.GetPostById(query.id).then(async (p: Post) => {
      const creator = p.createdBy.id === query.userId;
      const output: PostOutput = {
        id: p.id,
        images: p.images,
        description: p.description,
        createdAt: p.createdAt,
        createdBy: p.createdBy,
        totalLikes: p.totalLikes,
        liked: liked,
        creator: creator,
      };
      return output;
    });
  }
}
