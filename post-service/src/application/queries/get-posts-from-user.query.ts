import { IQuery } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPostFromUser implements IQuery {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
