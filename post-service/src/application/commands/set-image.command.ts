import { ICommand } from '@nestjs/cqrs';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SetImageCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  postId: string;
  @IsNotEmpty()
  @IsInt()
  height: number;
  @IsNotEmpty()
  @IsInt()
  width: number;
  @IsNotEmpty()
  @IsString()
  url: string;

  constructor(
    id: string,
    postId: string,
    width: number,
    height: number,
    url: string,
  ) {
    (this.id = id),
      (this.postId = postId),
      (this.width = width),
      (this.height = height),
      (this.url = url);
  }
}
