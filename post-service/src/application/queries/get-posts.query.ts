import { IQuery } from '@nestjs/cqrs';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GetPostsQuery implements IQuery {
  @IsInt()
  @IsNotEmpty()
  first: number;
  @IsInt()
  @IsNotEmpty()
  from: number;
  @IsNotEmpty()
  @IsString()
  userId: string;
  constructor(first: number, from: number, user_id: string) {
    this.first = first;
    this.from = from;
    this.userId = user_id;
  }
}
