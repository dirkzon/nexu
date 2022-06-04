import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostOutput } from '../../domain/models/PostOutput';
import { ValidateClass } from '../../infrastructure/services/validator';
import { PostStore } from '../ports/post.store';
import { GetPostFromUser } from '../queries/get-posts-from-user.query';

@QueryHandler(GetPostFromUser)
export class GetAllPostFromUserHandler
  implements IQueryHandler<GetPostFromUser>
{
  constructor(private readonly postStore: PostStore) {}

  async execute(query: GetPostFromUser): Promise<any> {
    await ValidateClass(query);
    return await this.postStore
      .GetPostsFromUser(query.id)
      .then(async (posts) => {
        const output: PostOutput[] = [];
        await Promise.all(
          posts.map(async (post) => {
            const liked = !query.id
              ? false
              : await this.postStore.HasUserLiked(query.id, post.id);
            output.push({
              id: post.id,
              images: post.images,
              description: post.description,
              createdAt: post.createdAt,
              createdBy: post.createdBy,
              totalLikes: post.totalLikes,
              liked: liked,
              creator: false,
            });
          }),
        );
        return output;
      });
  }
}
