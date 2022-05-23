import { ICommand } from '@nestjs/cqrs';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SetLikeCommand implements ICommand {
  @IsBoolean()
  like: boolean;
  @IsNotEmpty()
  @IsString()
  postId: string;
  @IsNotEmpty()
  @IsString()
  likedBy: string;

  constructor(like: boolean, post_id: string, liked_by: string) {
    this.like = like;
    this.postId = post_id;
    this.likedBy = liked_by;
  }
}
