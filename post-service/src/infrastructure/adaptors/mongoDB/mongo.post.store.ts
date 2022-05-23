import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PostEntity, PostDocument } from './models/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PostStore } from '../../../application/ports/post.store';
import { Post } from '../../../domain/models/Post';
import { Image } from '../../../domain/models/Image';
import { ImageDocument, ImageEntity } from './models/image.schema';

@Injectable()
export class MongoPostStore implements PostStore {
  constructor(
    @InjectModel(PostEntity.name)
    private readonly post_model: Model<PostDocument>,
    @InjectModel(ImageEntity.name)
    private readonly image_model: Model<ImageDocument>,
  ) {}

  async SetLike(
    like: boolean,
    post_id: string,
    liked_by: string,
  ): Promise<any> {
    if (like) {
      return await Promise.resolve(
        await this.post_model.findOneAndUpdate(
          { id: post_id },
          { $push: { likedBy: liked_by }, $inc: { totalLikes: 1 } },
          { new: true },
        ),
      );
    } else {
      return await Promise.resolve(
        await this.post_model.findOneAndUpdate(
          { id: post_id },
          { $pull: { likedBy: liked_by }, $inc: { totalLikes: -1 } },
          { new: true },
        ),
      );
    }
  }

  async HasUserLiked(user_id: string, post_id: string): Promise<boolean> {
    const test = await this.post_model.findOne({ id: post_id });
    return test.likedBy.includes(user_id);
  }

  async AddImage(new_image: Image, post_id: string): Promise<Post> {
    const image = new this.image_model(new_image);
    return await this.post_model.findOneAndUpdate(
      { id: post_id },
      { $push: { images: image } },
      { new: true },
    );
  }

  async CreatePost(new_post: Post): Promise<Post> {
    const post = new this.post_model(new_post);
    post.likedBy = [];
    return Promise.resolve(await post.save());
  }

  async GetPostById(id: string): Promise<Post> {
    return await Promise.resolve(await this.post_model.findOne({ id: id }));
  }
}
