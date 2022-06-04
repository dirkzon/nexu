import { Injectable } from '@nestjs/common';
import { Comment } from '../../domain/models/comment';
import { UserUpdatedInput } from '../../infrastructure/adaptors/RabbitMQ/models/user-updated.input';

@Injectable()
export abstract class CommentStore {
  abstract CreateComment(new_comment: Comment);
  abstract GetAllCommentsForPost(post_id: string);
  abstract UpdateUser(updated_user: UserUpdatedInput);
  abstract CanComment(post_id: string, user_id: string);
}
