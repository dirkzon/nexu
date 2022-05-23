import { Injectable } from '@nestjs/common';
import { Image } from '../../domain/models/Image';
import { Post } from '../../domain/models/Post';

@Injectable()
export abstract class PostStore {
  abstract GetPostById(id: string): Promise<Post>;
  abstract CreatePost(new_post: Post): Promise<Post>;
  abstract AddImage(new_image: Image, post_id: string): Promise<Post>;
  abstract SetLike(like: boolean, post_id: string, liked_by: string);
  abstract HasUserLiked(user_id: string, post_id: string);
}
