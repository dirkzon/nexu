import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Post } from '../../domain/models/Post';
import { PostOutput } from '../../domain/models/PostOutput';
import { PostStore } from '../ports/post.store';
import { GetPostsQuery } from '../queries/get-posts.query';

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler implements IQueryHandler<GetPostsQuery> {
  constructor(private readonly postStore: PostStore) {}
  async execute(query: GetPostsQuery): Promise<PostOutput[]> {
    return await this.postStore
      .GetPosts({
        first: query.first,
        from: query.from,
      })
      .then(async (posts: Post[]) => {
        const output: PostOutput[] = [];
        await Promise.all(
          posts.map(async (post) => {
            const liked = !query.userId
              ? false
              : await this.postStore.HasUserLiked(query.userId, post.id);
            const creator = post.createdBy.id === query.userId;
            output.push({
              id: post.id,
              images: post.images,
              description: post.description,
              createdAt: post.createdAt,
              createdBy: post.createdBy,
              totalLikes: post.totalLikes,
              liked: liked,
              creator: creator,
            });
          }),
        );
        return output;
      });
  }
}
