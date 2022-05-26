import { Injectable } from '@nestjs/common';
import { Comment } from '../../domain/models/comment';

@Injectable()
export abstract class CommentStore {
  abstract CreateComment(new_comment: Comment);
  abstract GetAllCommentsForPost(post_id: string);
}
