import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserCommand implements ICommand {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
