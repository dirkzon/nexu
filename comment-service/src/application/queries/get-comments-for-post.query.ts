import { IQuery } from '@nestjs/cqrs';
import { IsString } from 'class-validator';

export class GetCommentsForPostQuery implements IQuery {
  @IsString()
  postId: string;

  constructor(post_id: string) {
    this.postId = post_id;
  }
}
