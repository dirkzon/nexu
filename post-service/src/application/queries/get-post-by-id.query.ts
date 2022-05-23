import { IQuery } from '@nestjs/cqrs';
import { IsString, Length } from 'class-validator';

export class GetPostByIdQuery implements IQuery {
  @IsString()
  readonly id: string;
  @IsString()
  readonly userId: string;

  constructor(id: string, user_id: string) {
    this.id = id;
    this.userId = user_id;
  }
}
