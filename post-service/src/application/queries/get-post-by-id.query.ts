import { IQuery } from '@nestjs/cqrs';
import { IsString, Length } from 'class-validator';

export class GetPostByIdQuery implements IQuery {
  @IsString()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
