import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class deletePostCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  postId: string;

  constructor(user_id: string, post_id: string) {
    this.userId = user_id;
    this.postId = post_id;
  }
}
