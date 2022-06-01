import { Injectable } from '@nestjs/common';
import { Image } from '../../domain/models/Image';
import { Pagination } from '../../domain/models/Pagination';
import { Post } from '../../domain/models/Post';
import { UpdateUser } from '../../domain/models/UserUpdate';

@Injectable()
export abstract class PostStore {
  abstract GetPostById(id: string): Promise<Post>;
  abstract CreatePost(new_post: Post): Promise<Post>;
  abstract AddImage(new_image: Image, post_id: string): Promise<Post>;
  abstract SetLike(like: boolean, post_id: string, liked_by: string);
  abstract HasUserLiked(user_id: string, post_id: string);
  abstract GetPosts(pagination: Pagination);
  abstract UpdateUser(updated_user: UpdateUser);
}
