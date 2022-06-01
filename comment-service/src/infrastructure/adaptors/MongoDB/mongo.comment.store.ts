import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentStore } from '../../../application/ports/comment.store';
import { Comment } from '../../../domain/models/comment';
import { UserUpdatedInput } from '../RabbitMQ/models/user-updated.input';
import { CommentDocument, CommentEntity } from './models/comment.schema';

@Injectable()
export class MongoCommentStore implements CommentStore {
  constructor(
    @InjectModel(CommentEntity.name)
    private readonly comment_model: Model<CommentDocument>,
  ) {}

  async UpdateUser(updated_user: UserUpdatedInput) {
    await this.comment_model.updateMany(
      { 'createdBy.id': updated_user.id },
      { $set: { 'createdBy.name': updated_user.name } },
    );
  }

  async GetAllCommentsForPost(post_id: string) {
    return await Promise.resolve(
      await this.comment_model.find({ postId: post_id }),
    );
  }

  async CreateComment(new_comment: Comment) {
    const comment = new this.comment_model(new_comment);
    return await Promise.resolve(await comment.save());
  }
}
