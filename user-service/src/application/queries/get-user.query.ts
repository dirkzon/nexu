import { IQuery } from '@nestjs/cqrs';
import { IsString } from 'class-validator';

export class GetUserByIdQuery implements IQuery {
  @IsString()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
