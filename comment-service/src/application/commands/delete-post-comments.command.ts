import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostCommentsCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  postId: string;

  constructor(post_id: string) {
    this.postId = post_id;
  }
}
