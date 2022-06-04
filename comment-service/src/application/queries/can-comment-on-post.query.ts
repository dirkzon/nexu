import { IQuery } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CanCommentQuery implements IQuery {
  @IsString()
  @IsNotEmpty()
  postId: string;
  @IsString()
  @IsNotEmpty()
  userId: string;

  constructor(post_id: string, user_id: string) {
    this.postId = post_id;
    this.userId = user_id;
  }
}
