import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PostEntity, PostDocument } from './models/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PostStore } from '../../../application/ports/post.store';
import { Post } from '../../../domain/models/Post';
import { Image } from '../../../domain/models/Image';
import { ImageDocument, ImageEntity } from './models/image.schema';
import { Pagination } from '../../../domain/models/Pagination';
import { UpdateUser } from '../../../domain/models/UserUpdate';

@Injectable()
export class MongoPostStore implements PostStore {
  constructor(
    @InjectModel(PostEntity.name)
    private readonly post_model: Model<PostDocument>,
    @InjectModel(ImageEntity.name)
    private readonly image_model: Model<ImageDocument>,
  ) {}

  async GetPostsFromUser(user_id: string) {
    return Promise.resolve(
      await this.post_model.find({ 'createdBy.id': user_id }),
    );
  }

  async UpdateAvatar(updated_avatar: Image, user_id: string): Promise<any> {
    await this.post_model.updateMany(
      { 'createdBy.id': user_id },
      { $set: { 'createdBy.avatar': updated_avatar } },
    );
  }

  async UpdateUser(updated_user: UpdateUser) {
    await this.post_model.updateMany(
      { 'createdBy.id': updated_user.id },
      { $set: { 'createdBy.name': updated_user.name } },
    );
  }

  async GetPosts(pagination: Pagination) {
    return Promise.resolve(
      await this.post_model
        .find()
        .skip(pagination.from)
        .limit(pagination.first),
    );
  }

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
    const post = await this.post_model.findOne({ id: post_id });
    if (!post) return false;
    return post.likedBy.includes(user_id);
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
