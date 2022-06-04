import { ICommand } from '@nestjs/cqrs';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAvatarCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsInt()
  @IsNotEmpty()
  height: number;
  @IsInt()
  @IsNotEmpty()
  width: number;
  @IsString()
  @IsNotEmpty()
  url: string;

  constructor(
    id: string,
    user_id: string,
    height: number,
    width: number,
    url: string,
  ) {
    this.id = id;
    this.userId = user_id;
    this.height = height;
    this.width = width;
    this.url = url;
  }
}
