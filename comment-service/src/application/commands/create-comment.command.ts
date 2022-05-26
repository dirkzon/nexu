import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  comment: string;
  @IsString()
  @IsNotEmpty()
  postId: string;
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  constructor(comment: string, post_id: string, createdBy: string) {
    this.comment = comment;
    this.postId = post_id;
    this.createdBy = createdBy;
  }
}
